import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type ParentCorporation = string

export const parentCorporation = {
  id: "01a0659e-e27e-75d6-b668-b62aac3a3430",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "parent-corporation",
  propertySlug: "parent-corporation",
  definition: "the group the make belongs to",
  maxLength: 200,
  nameFormat: null,
} as const satisfies TextProperty
