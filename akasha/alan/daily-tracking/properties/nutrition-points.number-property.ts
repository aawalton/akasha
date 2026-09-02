import type { NumberProperty } from "@akasha/pages-system/number-property"

export type NutritionPoints = number

export const nutritionPoints = {
  id: "01a05fd8-c30f-7e34-b29c-9dbbb55a41fb",
  pageTypeSlug: "number-property",
  slug: "nutrition-points",
  propertySlug: "nutrition-points",
  definition: "the grams of whole plants Alan ate on a day",
  max: null,
} as const satisfies NumberProperty
