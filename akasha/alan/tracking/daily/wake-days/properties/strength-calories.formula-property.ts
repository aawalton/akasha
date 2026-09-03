import type { FormulaProperty } from "@akasha/pages-system/formula-property"

export type StrengthCalories = number

export const strengthCalories = {
  id: "01a06945-72cd-7001-bbcf-aa97f0485a52",
  pageTypeSlug: "formula-property",
  slug: "strength-calories",
  propertySlug: "strength-calories",
  definition: "the calories the day's strength work came to",
  formula: "{strength-volume} / 7",
} as const satisfies FormulaProperty
