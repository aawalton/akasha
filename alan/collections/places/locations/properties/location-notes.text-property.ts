import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const locationNotes = {
  id: "01a06583-acfb-7ca4-94e8-72e9a2cacb63",
  type: "text-property",
  slug: "location-notes",
  propertySlug: "notes",
  definition: "what the person kept the place for",
  maxLength: 500,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
