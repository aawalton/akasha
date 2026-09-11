import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const nutritionPoints = {
  id: "01a05fd8-c30f-7e34-b29c-9dbbb55a41fb",
  type: "number-property",
  slug: "nutrition-points",
  propertySlug: "nutrition-points",
  definition: "the grams of whole plants Alan ate on a day",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
