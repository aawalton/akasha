import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const puzzleLicense = {
  id: "01a06582-bd62-786a-a2c2-a8e5939869a4",
  type: "text-property",
  slug: "puzzle-license",
  propertySlug: "license",
  definition: "the licence a puzzle is published under",
  maxLength: 50,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
