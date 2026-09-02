import type { TextProperty } from "@akasha/pages-system/text-property"

export type ConstantFamily = string

export const constantFamily = {
  id: "01a05fd1-d438-7600-b72e-b390f2f0dabf",
  pageTypeSlug: "text-property",
  slug: "constant-family",
  propertySlug: "constant-family",
  definition: "the group of gear values a constant belongs to",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
