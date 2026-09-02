import type { TextProperty } from "@akasha/pages-system/text-property"

export type ConstantKind = string

export const constantKind = {
  id: "01a05fcf-246a-7dcf-b177-c235a40a5808",
  pageTypeSlug: "text-property",
  slug: "constant-kind",
  propertySlug: "kind",
  definition: "the sort of value a game constant holds",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
