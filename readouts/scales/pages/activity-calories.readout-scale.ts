import type { ReadoutScale } from "../readout-scale.page-type.ts"

export const activityCalories = {
  id: "01a06222-9828-7623-8030-e79779b599ef",
  pageTypeSlug: "readout-scale",
  slug: "activity-calories",
  definition: "calories burned in a day's activity",
  redAt: 100,
  yellowAt: 200,
  greenAt: 400,
  blueAt: 800,
} as const satisfies ReadoutScale
