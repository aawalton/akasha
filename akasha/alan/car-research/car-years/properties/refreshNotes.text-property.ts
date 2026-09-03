import type { TextProperty } from "@akasha/pages-system/text-property"

export type RefreshNotes = string

export const refreshNotes = {
  id: "01a06599-35ba-7e56-a2cc-8404c03fe09c",
  pageTypeSlug: "text-property",
  slug: "refreshNotes",
  propertySlug: "refreshNotes",
  definition: "what changed from the model year before",
  max: 2000,
  nameFormatSlug: null,
} as const satisfies TextProperty
