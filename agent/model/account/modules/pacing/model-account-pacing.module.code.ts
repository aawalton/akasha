import { dayAfter } from "akasha/alan/harness/day-boundary/modules/day-string/day-string.module.code.ts"
import {
  getEsoDayStr,
  getEsoDayWindow,
} from "akasha/alan/harness/day-boundary/modules/eso-day/eso-day.module.code.ts"
import { asInstant } from "akasha/code/type/narrowing/modules/as-instant/as-instant.module.code.ts"

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

const SUNDAY = 0

type PacingDerivations = {
  readonly burnRateNeeded: number
  readonly paceHoursDiff: number
  readonly fiveHourStartedAt: string | null
  readonly sevenDayStartedAt: string | null
}

function isSunday(dayStr: string): boolean {
  return new Date(dayStr).getUTCDay() === SUNDAY
}

function sundayOverlapMs(startMs: number, endMs: number): number {
  if (endMs <= startMs) return 0
  let total = 0
  let day = getEsoDayStr(new Date(startMs))
  let window = getEsoDayWindow(day)
  while (window.start.getTime() < endMs) {
    if (isSunday(day)) {
      total += Math.min(endMs, window.end.getTime()) - Math.max(startMs, window.start.getTime())
    }
    day = dayAfter(day)
    window = getEsoDayWindow(day)
  }
  return total
}

function endOfTodayMs(now: number): number {
  return getEsoDayWindow(getEsoDayStr(new Date(now))).end.getTime()
}

function elapsedFraction(now: number, sevenDayResetsAt: string | null): number {
  const resetMs = asInstant(sevenDayResetsAt)
  if (resetMs === null) return 1
  const windowStart = resetMs - MS_A_WEEK
  const effectiveEnd = Math.min(endOfTodayMs(now), resetMs)
  const elapsedRaw = Math.max(0, effectiveEnd - windowStart)
  const sundayMs = sundayOverlapMs(windowStart, effectiveEnd)
  const elapsedLessSunday = Math.max(0, elapsedRaw - sundayMs)
  return Math.max(0, Math.min(1, elapsedLessSunday / MS_A_WEEK_LESS_SUNDAY))
}

function hoursRemaining(now: number, sevenDayResetsAt: string | null): number {
  const resetMs = asInstant(sevenDayResetsAt)
  if (resetMs === null) return HOURS_FALLBACK
  const rawMs = resetMs - now
  const sundayMs = sundayOverlapMs(now, resetMs)
  return Math.max(MIN_HOURS_REMAINING, (rawMs - sundayMs) / MS_AN_HOUR)
}

function startedBefore(iso: string | null, ms: number): string | null {
  const at = asInstant(iso)
  return at === null ? null : new Date(at - ms).toISOString()
}

export function hoursUntilReset(args: { now: number; sevenDayResetsAt: string | null }): number {
  const resetMs = asInstant(args.sevenDayResetsAt)
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
