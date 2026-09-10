import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type ReviewFlag = string

export const reviewFlag = {
  id: "01a06583-acfb-7a9f-891f-f0bbe6197882",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "review-flag",
  propertySlug: "review-flag",
  definition: "what was unclear about tying a review to this place",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty
