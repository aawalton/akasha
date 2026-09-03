import type { TextProperty } from "@akasha/pages-system/text-property"

export type OpeningEco = string

export const openingEco = {
  id: "01a06582-bd62-76e4-a5bc-0723ebe3799a",
  pageTypeSlug: "text-property",
  slug: "opening-eco",
  propertySlug: "opening-eco",
  definition: "the ECO code of an opening",
  max: 3,
  nameFormatSlug: null,
} as const satisfies TextProperty
