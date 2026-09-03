import type { TextProperty } from "@akasha/pages-system/text-property"

export type Note = string

export const note = {
  id: "01a06580-66fd-779f-a536-de00d810a18d",
  pageTypeSlug: "text-property",
  slug: "note",
  propertySlug: "note",
  definition: "what Alan said about the set as he logged it",
  max: 500,
  nameFormatSlug: null,
} as const satisfies TextProperty
