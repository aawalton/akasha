import type { TextProperty } from "@akasha/pages-system/text-property"

export type MobilityReadingValueText = string

export const mobilityReadingValueText = {
  id: "01a06558-36e9-7948-a1a6-bbb7c5b6ba42",
  pageTypeSlug: "text-property",
  slug: "mobility-reading-value-text",
  propertySlug: "mobility-reading-value-text",
  definition: "the reading as it was written down",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
