import type { TextProperty } from "@akasha/pages-system/text-property"

export type ReliabilityNotes = string

export const reliabilityNotes = {
  id: "01a0659e-e27e-7cfc-ba56-e6f573f7789f",
  pageTypeSlug: "text-property",
  slug: "reliability-notes",
  propertySlug: "reliability-notes",
  definition: "how the make's cars hold up",
  max: 2000,
  nameFormatSlug: null,
} as const satisfies TextProperty
