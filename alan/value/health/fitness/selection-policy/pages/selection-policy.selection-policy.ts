import type { SelectionPolicy } from "akasha/alan/value/health/fitness/selection-policy/selection-policy.page-type.types.ts"

export const selectionPolicy = {
  id: "01a06862-a02e-7416-95e5-bb41af7c60d1",
  type: "page-type/selection-policy",
  slug: "selection-policy",
  weightLongevity: 40,
  weightEnergy: 30,
  weightFunctionality: 20,
  weightAesthetics: 10,
  noveltyCapPerSession: 1,
  weeklySetFloor: 6,
  weeklySetCeiling: 12,
  nearFailureRpeFloor: 7,
  zone2WeeklyFloor: 150,
  recencyWeight: 0.05,
  recencySaturationDays: 21,
  boutsWithoutProgress: 3,
  repsBeforeSlowing: 20,
  warmupLoadShare: 0.5,
  warmupReps: 10,
} as const satisfies SelectionPolicy
