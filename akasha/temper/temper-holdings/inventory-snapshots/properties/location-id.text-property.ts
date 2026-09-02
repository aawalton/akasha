import type { TextProperty } from "@akasha/pages-system/text-property"

export type LocationId = string

export const locationId = {
  id: "01a06053-b380-7bc6-96e3-52fb477f64ba",
  pageTypeSlug: "text-property",
  slug: "location-id",
  propertySlug: "location-id",
  definition: "the bag holder a stack sits with, as the game names holders",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
