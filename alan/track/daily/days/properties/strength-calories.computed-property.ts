import type { ComputedProperty } from "akasha/pages/computed-properties/computed-property.page-type.types.ts"

export type StrengthCalories = number

export const strengthCalories = {
  id: "01a071fe-2d1f-7edf-abb4-af88ca8e64c7",
  pageTypeSlug: "computed-property",
  type: "computed-property",
  slug: "strength-calories",
  propertySlug: "strength-calories",
  definition: "the calories the day's strength work came to",
  holds: "number",
  code: "ts",
} as const satisfies ComputedProperty
