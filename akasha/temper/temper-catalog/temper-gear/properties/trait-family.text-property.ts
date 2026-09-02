import type { TextProperty } from "@akasha/pages-system/text-property"

export type TraitFamily = string

export const traitFamily = {
  id: "01a05fd1-d43e-7028-aec5-acb72b595320",
  pageTypeSlug: "text-property",
  slug: "trait-family",
  propertySlug: "trait-family",
  definition: "the kind of piece a trait is worked into",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
