import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type OpeningEco = string

export const openingEco = {
  id: "01a06582-bd62-76e4-a5bc-0723ebe3799a",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "opening-eco",
  propertySlug: "opening-eco",
  definition: "the ECO code of an opening",
  maxLength: 3,
  nameFormat: null,
} as const satisfies TextProperty
