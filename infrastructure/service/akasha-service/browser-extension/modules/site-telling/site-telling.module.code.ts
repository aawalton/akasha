const PANEL =
  "position:fixed;right:24px;bottom:24px;z-index:2147483647;padding:16px 20px;border-radius:12px;" +
  "color-scheme:dark;background:Canvas;color:CanvasText;font:15px/1.4 system-ui,sans-serif;max-width:360px"

const SHOWN_MS = 1500

export function panelOf(text: string): HTMLDivElement {
  const panel = document.createElement("div")
  panel.style.cssText = PANEL
  panel.textContent = text
  document.body.append(panel)
  return panel
}

export function told(text: string, ms: number = SHOWN_MS): undefined {
  const panel = panelOf(text)
  setTimeout(() => panel.remove(), ms)
}
