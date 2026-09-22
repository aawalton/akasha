import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const traitFamily = {
  id: "01a05fd1-d43e-7028-aec5-acb72b595320",
  type: "page-type/text-property",
  slug: "trait-family",
  propertySlug: "trait-family",
  definition: "the kind of piece into which a trait is worked",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
