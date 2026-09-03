import type { TextProperty } from "@akasha/pages-system/text-property"

export type CategoryGroup = string

export const categoryGroup = {
  id: "01a0680a-1a00-700a-b915-2f6c8d3a110a",
  pageTypeSlug: "text-property",
  slug: "category-group",
  propertySlug: "category-group",
  definition: "the heading Monarch files a category under",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
