import { requireMatchPositional } from "@shared/utils-narrow/require-match-positional"
import { z } from "zod"

export interface RecencyPolicy {
  readonly recencyWeight: number
  readonly recencySaturationDays: number
}

const DAY_STR_RE = /^(\d{4})-(\d{2})-(\d{2})$/
const DAY_STR_CAPTURES = z.tuple([z.coerce.number(), z.coerce.number(), z.coerce.number()])
const MS_PER_DAY = 86_400_000

function dayStrToUtcMs(dayStr: string): number {
  const [y, m, d] = requireMatchPositional(
    DAY_STR_RE,
    DAY_STR_CAPTURES,
    dayStr,
    `day string "${dayStr}" (expected YYYY-MM-DD)`
  )
  return Date.UTC(y, m - 1, d)
}

export function daysBetweenDayStrs(fromDayStr: string, toDayStr: string): number {
  return Math.round((dayStrToUtcMs(toDayStr) - dayStrToUtcMs(fromDayStr)) / MS_PER_DAY)
}

export function recencyBonus(
  priorDayStr: string | null,
  todayDayStr: string,
  policy: RecencyPolicy
): number {
  if (priorDayStr === null) return 0
  const { recencyWeight, recencySaturationDays } = policy
  if (recencySaturationDays <= 0) return 0
  const daysSince = daysBetweenDayStrs(priorDayStr, todayDayStr)
  if (daysSince <= 0) return 0
  return recencyWeight * (Math.min(daysSince, recencySaturationDays) / recencySaturationDays)
}

export function effectiveScore(blend: number, bonus: number): number {
  return blend + bonus
}
