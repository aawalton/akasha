import type { TextProperty } from "@akasha/pages/text-property"

export type ReviewText = string

export const reviewText = {
  id: "01a06583-acfb-717e-bf33-d1d35f45ab6b",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "review-text",
  propertySlug: "review-text",
  definition: "what the person wrote about the place",
  maxLength: 2000,
  nameFormat: null,
} as const satisfies TextProperty
