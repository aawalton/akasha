import type { TextProperty } from "@akasha/pages-system/text-property"

export type LocationNotes = string

export const locationNotes = {
  id: "01a06583-acfb-7ca4-94e8-72e9a2cacb63",
  pageTypeSlug: "text-property",
  slug: "location-notes",
  propertySlug: "notes",
  definition: "what the person kept the place for",
  max: 500,
  nameFormatSlug: null,
} as const satisfies TextProperty
