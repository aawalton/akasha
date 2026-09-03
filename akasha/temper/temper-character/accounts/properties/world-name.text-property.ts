import type { TextProperty } from "@akasha/pages-system/text-property"

export type WorldName = string

export const worldName = {
  id: "01a0675a-f185-7ba7-85f2-df84ed542a9e",
  pageTypeSlug: "text-property",
  slug: "world-name",
  propertySlug: "world-name",
  definition: "the megaserver a reading was taken on",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
