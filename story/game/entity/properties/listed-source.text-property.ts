import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const listedSource = {
  id: "01a0c637-3967-7b13-9eb2-5a5de928990a",
  type: "page-type/text-property",
  slug: "listed-source",
  propertySlug: "source",
  definition: "where one of the things in a page's list came from",
  maxLength: 300,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
