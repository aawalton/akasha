import type { TextProperty } from "@akasha/pages-system/text-property"

export type SortKey = string

export const sortKey = {
  id: "01a0680d-4d00-7005-8f26-2a7d5c1b4106",
  pageTypeSlug: "text-property",
  slug: "sort-key",
  propertySlug: "key",
  definition: "a property a view orders its pages by",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
