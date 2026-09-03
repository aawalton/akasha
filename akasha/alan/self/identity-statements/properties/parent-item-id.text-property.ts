import type { TextProperty } from "@akasha/pages-system/text-property"

export type ParentItemId = string

export const parentItemId = {
  id: "01a06575-c2b8-74e8-a031-029c1f8ed7b4",
  pageTypeSlug: "text-property",
  slug: "parent-item-id",
  propertySlug: "parent-item-id",
  definition: "the statement this one sits under",
  max: 50,
  nameFormatSlug: null,
} as const satisfies TextProperty
