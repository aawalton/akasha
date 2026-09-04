import type { TextProperty } from "@akasha/pages-system/text-property"

export type RefreshNotes = string

export const refreshNotes = {
  id: "01a0659d-2433-793a-b935-c2e9affcdf56",
  pageTypeSlug: "text-property",
  slug: "refresh-notes",
  propertySlug: "refresh-notes",
  definition: "what changed from the model year before",
  max: 2000,
  nameFormatSlug: null,
} as const satisfies TextProperty
