import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const bondDirection = {
  id: "01a0c63c-0c45-76a0-a7a8-a762e244942f",
  type: "page-type/text-property",
  slug: "bond-direction",
  propertySlug: "direction",
  definition: "which way a bond runs between the two it holds",
  maxLength: 40,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
