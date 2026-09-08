const WIDGET = "widget"

export function widgetTapped(rawUrl: unknown): string | null {
  if (typeof rawUrl !== "string") return null
  let parsed: URL
  try {
    parsed = new URL(rawUrl)
  } catch {
    return null
  }
  const named = new URLSearchParams(parsed.hash.slice(1)).get(WIDGET)
  return named === null || named === "" ? null : named
}
