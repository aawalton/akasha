import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const puzzleLicense = {
  id: "01a06582-bd62-786a-a2c2-a8e5939869a4",
  type: "page-type/text-property",
  slug: "puzzle-license",
  propertySlug: "license",
  definition: "a puzzle's licence",
  maxLength: 50,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
