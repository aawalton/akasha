import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ActiveCalories = number

export const activeCalories = {
  id: "01a05fd8-c30f-79d0-aebb-2017f8333f88",
  pageTypeSlug: "number-property",
  slug: "active-calories",
  propertySlug: "active-calories",
  definition: "the calories Alan burned moving on a day",
  max: null,
} as const satisfies NumberProperty
