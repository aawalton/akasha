import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const world = {
  id: "01a06424-329c-7149-a41a-d7dec22745d0",
  type: "page-type/relation-property",
  slug: "world",
  propertySlug: "world",
  definition: "something's world",
  targetPageType: "page-type/world",
  types: "ts",
  createdAt: "2026-09-02T22:01:28.988Z",
  updatedAt: "2026-09-22T13:44:02.000Z",
} as const satisfies RelationProperty
