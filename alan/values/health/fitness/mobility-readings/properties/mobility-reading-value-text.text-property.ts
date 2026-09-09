import type { TextProperty } from "@akasha/pages/text-property"

export type MobilityReadingValueText = string

export const mobilityReadingValueText = {
  id: "01a06558-36e9-7948-a1a6-bbb7c5b6ba42",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "mobility-reading-value-text",
  propertySlug: "mobility-reading-value-text",
  definition: "the reading as it was written down",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty
