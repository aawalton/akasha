import type { TextProperty } from "@akasha/pages-system/text-property"

export type ReliabilityNotes = string

export const reliabilityNotes = {
  id: "01a06598-aa80-7af3-906d-89264e371364",
  pageTypeSlug: "text-property",
  slug: "reliabilityNotes",
  propertySlug: "reliabilityNotes",
  definition: "how the make's cars hold up",
  max: 2000,
  nameFormatSlug: null,
} as const satisfies TextProperty
