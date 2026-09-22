import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const openingName = {
  id: "01a06582-bd62-7abb-9501-df1981589ee2",
  type: "page-type/text-property",
  slug: "opening-name",
  propertySlug: "opening-name",
  definition: "a game's opening",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
