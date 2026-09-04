import type { TextProperty } from "@akasha/pages-system/text-property"

export type ParentCorporation = string

export const parentCorporation = {
  id: "01a0659e-e27e-75d6-b668-b62aac3a3430",
  pageTypeSlug: "text-property",
  slug: "parent-corporation",
  propertySlug: "parent-corporation",
  definition: "the group the make belongs to",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
