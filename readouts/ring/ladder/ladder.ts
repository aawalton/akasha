import type { DailyTierLadder } from "../tier/tier.ts"

export const GREEN_DAY_UNITS_LADDER: DailyTierLadder = [
  { threshold: 0.25, color: "red" },
  { threshold: 0.5, color: "yellow" },
  { threshold: 1, color: "green" },
  { threshold: 2, color: "blue" },
]

export const FAITH_LEARN_DAILY_LADDER: DailyTierLadder = [
  { threshold: 2_500, color: "red" },
  { threshold: 5_000, color: "yellow" },
  { threshold: 10_000, color: "green" },
  { threshold: 20_000, color: "blue" },
]

export const DEFAULT_GREEN_DAY_POINTS = 10_000

export function greenDayUnits(
  points: number,
  greenDayPoints: number = DEFAULT_GREEN_DAY_POINTS
): number {
  const divisor = greenDayPoints > 0 ? greenDayPoints : DEFAULT_GREEN_DAY_POINTS
  return Math.max(points, 0) / divisor
}
