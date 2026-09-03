import type { SelectionPolicy } from "../../selection-policy.page-type.ts"

export const selectionPolicy = {
  id: "01a06862-a02e-7416-95e5-bb41af7c60d1",
  pageTypeSlug: "selection-policy",
  slug: "selection-policy",
  weightLongevity: 40,
  weightEnergy: 30,
  weightFunctionality: 20,
  weightAesthetics: 10,
  noveltyCapPerSession: 1,
  anchorBlockWeeks: 6,
  anchorEscapeRpeCeiling: 6,
  layoffGraceDays: 10,
  layoffMaxLoadReduction: 0.12,
  layoffSaturationDays: 28,
  weeklySetFloor: 6,
  weeklySetCeiling: 12,
  zone2WeeklyFloor: 150,
  recencyWeight: 0.05,
  recencySaturationDays: 21,
} as const satisfies SelectionPolicy
