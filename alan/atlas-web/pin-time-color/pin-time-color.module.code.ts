export type TimeBucket = "past" | "imminent" | "future" | "unscheduled"

export const IMMINENT_WINDOW_MS = 24 * 60 * 60 * 1000

export const TIME_BUCKET_TOKENS: Record<TimeBucket, string> = {
  past: "--tertiary",
  imminent: "--yellow",
  future: "--blue",
  unscheduled: "--secondary",
}

export function timeBucket(
  scheduledStart: string | null | undefined,
  scheduledEnd: string | null | undefined,
  nowMs: number
): TimeBucket {
  if (scheduledStart === null || scheduledStart === undefined || scheduledStart.length === 0) {
    return "unscheduled"
  }
  const startMs = Date.parse(scheduledStart)
  if (Number.isNaN(startMs)) return "unscheduled"

  let endMs = startMs
  if (scheduledEnd !== null && scheduledEnd !== undefined && scheduledEnd.length > 0) {
    const parsedEnd = Date.parse(scheduledEnd)
    if (!Number.isNaN(parsedEnd) && parsedEnd > startMs) endMs = parsedEnd
  }

  if (nowMs > endMs) return "past"
  if (nowMs < startMs - IMMINENT_WINDOW_MS) return "future"
  return "imminent"
}

export function pinTimeToken(
  scheduledStart: string | null | undefined,
  scheduledEnd: string | null | undefined,
  nowMs: number
): string {
  return TIME_BUCKET_TOKENS[timeBucket(scheduledStart, scheduledEnd, nowMs)]
}
