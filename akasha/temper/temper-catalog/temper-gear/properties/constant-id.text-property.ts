import type { TextProperty } from "@akasha/pages-system/text-property"

export type ConstantId = string

export const constantId = {
  id: "01a05fd1-d438-7e88-83de-053bfdab7fa7",
  pageTypeSlug: "text-property",
  slug: "constant-id",
  propertySlug: "constant-id",
  definition: "the value within its group a constant answers to",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
