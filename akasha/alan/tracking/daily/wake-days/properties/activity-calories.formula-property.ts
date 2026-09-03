import type { FormulaProperty } from "@akasha/pages-system/formula-property"

export type ActivityCalories = number

export const activityCalories = {
  id: "01a06945-72cd-7000-a0f2-85126c906d02",
  pageTypeSlug: "formula-property",
  slug: "activity-calories",
  propertySlug: "activity-calories",
  definition: "the calories the day's cardio and strength came to together",
  formula: "({active-calories} ?? 0) + ({strength-calories} ?? 0)",
} as const satisfies FormulaProperty
