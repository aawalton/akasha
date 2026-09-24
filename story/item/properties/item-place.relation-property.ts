import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const itemPlace = {
  id: "01a0d435-8b07-7b3c-95a7-8e2626e6ae38",
  type: "page-type/relation-property",
  slug: "item-place",
  propertySlug: "place",
  definition: "the place an item is in",
  targetPageType: "page-type/place",
  types: "ts",
} as const satisfies RelationProperty
