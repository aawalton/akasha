import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const shoppingItemStore = {
  id: "01a15447-1cff-7179-8056-e5f3f05fce97",
  type: "page-type/relation-property",
  slug: "shopping-item-store",
  propertySlug: "store",
  definition: "the store a shopping item is bought at",
  targetPageType: "page-type/store",
  types: "ts",
  createdAt: "2026-10-19T13:08:29.054Z",
  updatedAt: "2026-10-19T13:08:29.054Z",
} as const satisfies RelationProperty
