import { diffEsoDays } from "@akasha/day/eso-day"
import type { SelectionPolicy } from "@akasha/exercise-access/selection-policy"

export type RecencyPolicy = Pick<SelectionPolicy, "recencyWeight" | "recencySaturationDays">

export function recencyBonus(
  priorDayStr: string | null,
  todayDayStr: string,
  policy: RecencyPolicy
): number {
  if (priorDayStr === null) return 0
  const { recencyWeight, recencySaturationDays } = policy
  if (recencySaturationDays <= 0) return 0
  const daysSince = diffEsoDays(todayDayStr, priorDayStr)
  if (daysSince <= 0) return 0
  return recencyWeight * (Math.min(daysSince, recencySaturationDays) / recencySaturationDays)
}

export function effectiveScore(blend: number, bonus: number): number {
  return blend + bonus
}
