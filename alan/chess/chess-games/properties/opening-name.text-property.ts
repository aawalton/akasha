import type { TextProperty } from "@akasha/pages-system/text-property"

export type OpeningName = string

export const openingName = {
  id: "01a06582-bd62-7abb-9501-df1981589ee2",
  pageTypeSlug: "text-property",
  slug: "opening-name",
  propertySlug: "opening-name",
  definition: "the opening a game was played into",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
