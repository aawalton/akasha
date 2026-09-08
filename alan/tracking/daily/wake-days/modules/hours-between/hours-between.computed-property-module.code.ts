const AN_HOUR = 3600000

export function hoursBetween(from: unknown, to: unknown): number | null {
  if (typeof from !== "string" || typeof to !== "string") return null
  const start = Date.parse(from)
  const end = Date.parse(to)
  if (Number.isNaN(start) || Number.isNaN(end)) return null
  const hours = Math.abs(end - start) / AN_HOUR
  return Number.isFinite(hours) ? hours : null
}
