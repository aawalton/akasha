import type { TextProperty } from "@akasha/pages-system/text-property"

export type ValueType = string

export const valueType = {
  id: "01a05fe0-8427-7a16-b94d-45c0b105ce0a",
  pageTypeSlug: "text-property",
  slug: "value-type",
  propertySlug: "value-type",
  definition: "whether an effect's value counts as a whole number or as a fraction",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
