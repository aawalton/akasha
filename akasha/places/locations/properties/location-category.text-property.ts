import type { TextProperty } from "@akasha/pages-system/text-property"

export type LocationCategory = string

export const locationCategory = {
  id: "01a06583-acfb-7a3d-91c8-953aeac38361",
  pageTypeSlug: "text-property",
  slug: "location-category",
  propertySlug: "location-category",
  definition: "what kind of place it is",
  max: 20,
  nameFormatSlug: null,
} as const satisfies TextProperty
