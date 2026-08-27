export const VIEW_RECORD_STALENESS_MS = 5 * 60 * 1000

export function shouldRecordView(lastViewedAt: unknown, now: number, windowMs: number): boolean {
  const prev =
    typeof lastViewedAt === "number"
      ? lastViewedAt
      : typeof lastViewedAt === "string"
        ? Date.parse(lastViewedAt)
        : Number.NaN
  if (Number.isNaN(prev)) return true
  return now - prev >= windowMs
}
