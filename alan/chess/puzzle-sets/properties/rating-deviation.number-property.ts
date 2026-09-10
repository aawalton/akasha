import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type RatingDeviation = number

export const ratingDeviation = {
  id: "01a06582-bd62-7b1e-a035-ca03e3efa174",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "rating-deviation",
  propertySlug: "rating-deviation",
  definition: "how uncertain a puzzle's rating is",
  max: null,
} as const satisfies NumberProperty
