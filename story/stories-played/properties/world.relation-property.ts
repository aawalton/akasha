import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const world = {
  id: "01a06424-329c-7149-a41a-d7dec22745d0",
  type: "relation-property",
  slug: "world",
  propertySlug: "world",
  definition: "the world something is of",
  targetPageType: "page-type/world",
  types: "ts",
} as const satisfies RelationProperty
