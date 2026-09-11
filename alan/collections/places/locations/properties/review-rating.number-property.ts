import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const reviewRating = {
  id: "01a06583-acfb-7817-b6a6-d22dc5eeabb5",
  type: "number-property",
  slug: "review-rating",
  propertySlug: "review-rating",
  definition: "the score the person gave the place",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
