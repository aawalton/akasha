import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ReviewRating = number

export const reviewRating = {
  id: "01a06583-acfb-7817-b6a6-d22dc5eeabb5",
  pageTypeSlug: "number-property",
  slug: "review-rating",
  propertySlug: "review-rating",
  definition: "the score the person gave the place",
  max: null,
} as const satisfies NumberProperty
