import type { GoalWeights } from "./scorer"

export interface SelectionPolicy {
  readonly weights: GoalWeights
  readonly noveltyCapPerSession: number
  readonly anchorBlockWeeks: number
  readonly weeklySetFloor: number
  readonly weeklySetCeiling: number
  readonly zone2WeeklyFloor: number
  readonly recencyWeight: number
  readonly recencySaturationDays: number
}
