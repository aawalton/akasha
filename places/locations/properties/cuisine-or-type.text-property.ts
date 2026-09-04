import type { TextProperty } from "@akasha/pages-system/text-property"

export type CuisineOrType = string

export const cuisineOrType = {
  id: "01a06583-acfb-7e90-8e06-5b624a15be42",
  pageTypeSlug: "text-property",
  slug: "cuisine-or-type",
  propertySlug: "cuisine-or-type",
  definition: "what the place serves",
  max: 20,
  nameFormatSlug: null,
} as const satisfies TextProperty
