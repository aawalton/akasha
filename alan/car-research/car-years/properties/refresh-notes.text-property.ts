import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const refreshNotes = {
  id: "01a0659d-2433-793a-b935-c2e9affcdf56",
  type: "text-property",
  slug: "refresh-notes",
  propertySlug: "refresh-notes",
  definition: "what changed from the model year before",
  maxLength: 2000,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
