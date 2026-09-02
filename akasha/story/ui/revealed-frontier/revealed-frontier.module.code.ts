export function toMs(value: unknown): number | null {
  if (typeof value === "number") return Number.isNaN(value) ? null : value
  if (typeof value === "string") {
    const parsed = Date.parse(value)
    return Number.isNaN(parsed) ? null : parsed
  }
  return null
}

export function latestFrontierMs(
  rows: readonly Record<string, unknown>[],
  preferredKey: string,
  fallbackKey: string
): number | null {
  let max: number | null = null
  for (const row of rows) {
    const ms = toMs(row[preferredKey]) ?? toMs(row[fallbackKey])
    if (ms !== null && (max === null || ms > max)) max = ms
  }
  return max
}
