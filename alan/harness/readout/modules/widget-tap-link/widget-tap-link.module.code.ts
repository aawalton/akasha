const WIDGET = "widget"
const TAP = "tap"

function fragmentNamed(rawUrl: unknown, key: string): string | null {
  if (typeof rawUrl !== "string") return null
  let parsed: URL
  try {
    parsed = new URL(rawUrl)
  } catch {
    return null
  }
  const named = new URLSearchParams(parsed.hash.slice(1)).get(key)
  return named === null || named === "" ? null : named
}

export function widgetTapped(rawUrl: unknown): string | null {
  return fragmentNamed(rawUrl, WIDGET)
}

export function widgetTapId(rawUrl: unknown): string | null {
  return fragmentNamed(rawUrl, TAP)
}

export function deliveryCounts(
  url: string,
  launchLink: string | null,
  countedTaps: ReadonlySet<string>
): boolean {
  const tap = widgetTapId(url)
  return tap === null ? url !== launchLink : !countedTaps.has(tap)
}
