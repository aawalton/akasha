import type { TextProperty } from "@akasha/pages-system/text-property"

export type ParentCorporation = string

export const parentCorporation = {
  id: "01a0659b-cde9-7274-a646-0a0d80616de5",
  pageTypeSlug: "text-property",
  slug: "parent-corporation",
  propertySlug: "parent-corporation",
  definition: "the group the make belongs to",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
