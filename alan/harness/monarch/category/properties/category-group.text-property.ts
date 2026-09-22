import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const categoryGroup = {
  id: "01a0680a-1a00-700a-b915-2f6c8d3a110a",
  type: "page-type/text-property",
  slug: "category-group",
  propertySlug: "category-group",
  definition: "the heading under which Monarch files a category",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
