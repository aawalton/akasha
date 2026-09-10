const OPEN_OVERLAY_SELECTOR = [
  '[data-slot="dialog-content"][data-state="open"]',
  '[data-slot="alert-dialog-content"][data-state="open"]',
  "[data-radix-popper-content-wrapper]",
].join(",")

export function restoreStuckBodyPointerEvents(): undefined {
  if (typeof document === "undefined") return
  if (document.body.style.pointerEvents !== "none") return
  if (document.querySelector(OPEN_OVERLAY_SELECTOR) != null) return
  document.body.style.pointerEvents = ""
}

export function scheduleRestoreStuckBodyPointerEvents(): undefined {
  if (typeof requestAnimationFrame === "function") {
    requestAnimationFrame(() => {
      requestAnimationFrame(restoreStuckBodyPointerEvents)
    })
    return
  }
  setTimeout(restoreStuckBodyPointerEvents, 0)
}
