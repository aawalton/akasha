import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const itemPlace = {
  id: "01a0d435-8b07-7b3c-95a7-8e2626e6ae38",
  type: "page-type/relation-property",
  slug: "item-place",
  propertySlug: "place",
  definition: "the place an item is in",
  targetPageType: "page-type/place",
  types: "ts",
  createdAt: "2026-09-24T16:17:53.927Z",
  updatedAt: "2026-09-26T17:47:23.000Z",
} as const satisfies RelationProperty
