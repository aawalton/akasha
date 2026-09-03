import type { TextProperty } from "@akasha/pages-system/text-property"

export type ReliabilityNotes = string

export const reliabilityNotes = {
  id: "01a0659b-cde9-7995-8fb0-eb5840ee5cab",
  pageTypeSlug: "text-property",
  slug: "reliability-notes",
  propertySlug: "reliability-notes",
  definition: "how the make's cars hold up",
  max: 2000,
  nameFormatSlug: null,
} as const satisfies TextProperty
