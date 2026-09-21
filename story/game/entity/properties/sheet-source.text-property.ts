import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const sheetSource = {
  id: "01a0c637-3967-7b13-9eb2-5a5de928990a",
  type: "page-type/text-property",
  slug: "sheet-source",
  propertySlug: "source",
  definition: "where one of the things a sheet lists came from",
  maxLength: 300,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
