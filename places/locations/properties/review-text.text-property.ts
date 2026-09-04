import type { TextProperty } from "@akasha/pages-system/text-property"

export type ReviewText = string

export const reviewText = {
  id: "01a06583-acfb-717e-bf33-d1d35f45ab6b",
  pageTypeSlug: "text-property",
  slug: "review-text",
  propertySlug: "review-text",
  definition: "what the person wrote about the place",
  max: 2000,
  nameFormatSlug: null,
} as const satisfies TextProperty
