import { getEsoDayStr, getEsoDayWindow } from "@akasha/day/eso-day"

const MS_AN_HOUR = 3_600_000

const MS_A_DAY = 24 * MS_AN_HOUR

const MS_A_WEEK = 7 * MS_A_DAY

const MS_FIVE_HOURS = 5 * MS_AN_HOUR

const SCALE_HOURS = 144

const MS_A_WEEK_LESS_SUNDAY = SCALE_HOURS * MS_AN_HOUR

const HOURS_FALLBACK = SCALE_HOURS

const MIN_HOURS_REMAINING = 0.001

const CEILING = 100

const HUNDREDTHS = 100

const DAYS_A_WEEK = 7

const SUNDAY_SHIFT = 4

type PacingDerivations = {
  readonly burnRateNeeded: number
  readonly paceHoursDiff: number
  readonly fiveHourStartedAt: string | null
  readonly sevenDayStartedAt: string | null
}

function instantOf(iso: string | null): number | null {
  if (iso === null) return null
  const at = new Date(iso).getTime()
  return Number.isNaN(at) ? null : at
}

function sundayOverlapMs(startMs: number, endMs: number): number {
  if (endMs <= startMs) return 0
  const firstMidnight = Math.floor(startMs / MS_A_DAY) * MS_A_DAY
  let total = 0
  for (let dayMidnight = firstMidnight; dayMidnight < endMs; dayMidnight += MS_A_DAY) {
    const epochDay = dayMidnight / MS_A_DAY
    if ((epochDay + SUNDAY_SHIFT) % DAYS_A_WEEK !== 0) continue
    const overlapStart = Math.max(startMs, dayMidnight)
    const overlapEnd = Math.min(endMs, dayMidnight + MS_A_DAY)
    if (overlapEnd > overlapStart) total += overlapEnd - overlapStart
  }
  return total
}

function endOfTodayMs(now: number): number {
  return getEsoDayWindow(getEsoDayStr(new Date(now))).end.getTime()
}

function elapsedFraction(now: number, sevenDayResetsAt: string | null): number {
  const resetMs = instantOf(sevenDayResetsAt)
  if (resetMs === null) return 1
  const windowStart = resetMs - MS_A_WEEK
  const effectiveEnd = Math.min(endOfTodayMs(now), resetMs)
  const elapsedRaw = Math.max(0, effectiveEnd - windowStart)
  const sundayMs = sundayOverlapMs(windowStart, effectiveEnd)
  const elapsedLessSunday = Math.max(0, elapsedRaw - sundayMs)
  return Math.max(0, Math.min(1, elapsedLessSunday / MS_A_WEEK_LESS_SUNDAY))
}

function hoursRemaining(now: number, sevenDayResetsAt: string | null): number {
  const resetMs = instantOf(sevenDayResetsAt)
  if (resetMs === null) return HOURS_FALLBACK
  const rawMs = resetMs - now
  const sundayMs = sundayOverlapMs(now, resetMs)
  return Math.max(MIN_HOURS_REMAINING, (rawMs - sundayMs) / MS_AN_HOUR)
}

function startedBefore(iso: string | null, ms: number): string | null {
  const at = instantOf(iso)
  return at === null ? null : new Date(at - ms).toISOString()
}

export function hoursUntilReset(args: { now: number; sevenDayResetsAt: string | null }): number {
  const resetMs = instantOf(args.sevenDayResetsAt)
  if (resetMs === null) return HOURS_FALLBACK
  const rawMs = resetMs - args.now
  if (rawMs <= 0) return HOURS_FALLBACK
  return rawMs / MS_AN_HOUR
}

export function computePacingDerivations(args: {
  now: number
  sevenDayUtil: number
  sevenDayResetsAt: string | null
  fiveHourResetsAt: string | null
}): PacingDerivations {
  const remainingFraction = Math.max(0, (CEILING - args.sevenDayUtil) / CEILING)
  const elapsed = elapsedFraction(args.now, args.sevenDayResetsAt)
  const used = args.sevenDayUtil / CEILING
  return {
    burnRateNeeded: remainingFraction / hoursRemaining(args.now, args.sevenDayResetsAt),
    paceHoursDiff: (elapsed - used) * SCALE_HOURS,
    fiveHourStartedAt: startedBefore(args.fiveHourResetsAt, MS_FIVE_HOURS),
    sevenDayStartedAt: startedBefore(args.sevenDayResetsAt, MS_A_WEEK),
  }
}

export function formatPaceHours(hours: number): string {
  const hundredths = Math.abs(Math.round(hours * HUNDREDTHS))
  const sign = hours >= 0 ? "+" : "-"
  const whole = Math.floor(hundredths / HUNDREDTHS)
  const rest = hundredths % HUNDREDTHS
  return `${sign}${whole}.${String(rest).padStart(2, "0")}`
}
