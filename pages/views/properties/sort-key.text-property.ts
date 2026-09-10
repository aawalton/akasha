import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type SortKey = string

export const sortKey = {
  id: "01a0680d-4d00-7005-8f26-2a7d5c1b4106",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "sort-key",
  propertySlug: "key",
  definition: "a property a view orders its pages by",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty
