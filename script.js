/* =========================
   PAGE NAVIGATION
========================= */

const pages = document.getElementById("pages");
const pageElems = document.querySelectorAll(".page");
let currentPage = 0;

// Set total width
pages.style.width = `${pageElems.length * 100}vw`;

function goTo(page) {
  page = Math.max(0, Math.min(pageElems.length - 1, Number(page)));
  currentPage = page;
  pages.style.transform = `translateX(-${page * 100}vw)`;

  if (page === 2) initSpeedometers();
}

// Button navigation
document.querySelectorAll("[data-page]").forEach(btn => {
  btn.addEventListener("click", () => goTo(btn.dataset.page));
});

// Keyboard support
document.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") goTo(currentPage + 1);
  if (e.key === "ArrowLeft") goTo(currentPage - 1);
});

// Touch support
let startX = 0;
pages.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});
pages.addEventListener("touchend", e => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) goTo(currentPage + 1);
  if (endX - startX > 50) goTo(currentPage - 1);
});

/* =========================
   START ENGINE BUTTON
========================= */

const startEngineBtn = document.getElementById("startEngine");

if (startEngineBtn) {
  startEngineBtn.addEventListener("click", () => {
    startEngineBtn.classList.add("revving");

    setTimeout(() => {
      startEngineBtn.classList.remove("revving");
      goTo(1);
    }, 900);
  });
}

/* =========================
   SPEEDOMETERS
========================= */

function updateSpeedo(speedo, value) {
  const dial = speedo.querySelector(".dial");
  const label = dial.querySelector("b");

  const degrees = Math.round(value * 3.6);

  dial.style.background = `
    conic-gradient(
      #ef4444 ${degrees}deg,
      rgba(255,255,255,0.08) 0deg
    )
  `;

  label.textContent = `${value}%`;
  dial.title = `${degrees}°`;
}

function initSpeedometers() {
  document.querySelectorAll(".speedo").forEach(speedo => {
    const slider = speedo.querySelector("input");
    if (!slider) return;

    updateSpeedo(speedo, Number(slider.value));

    slider.addEventListener("input", e => {
      updateSpeedo(speedo, Number(e.target.value));
    });
  });
}
