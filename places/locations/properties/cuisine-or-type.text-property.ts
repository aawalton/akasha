import type { TextProperty } from "@akasha/pages/text-property"

export type CuisineOrType = string

export const cuisineOrType = {
  id: "01a06583-acfb-7e90-8e06-5b624a15be42",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "cuisine-or-type",
  propertySlug: "cuisine-or-type",
  definition: "what the place serves",
  maxLength: 20,
  nameFormat: null,
} as const satisfies TextProperty
