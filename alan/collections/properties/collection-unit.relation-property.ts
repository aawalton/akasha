import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const collectionUnit = {
  id: "01a063de-2c60-7013-90a9-52d3c0a8908c",
  type: "relation-property",
  slug: "collection-unit",
  propertySlug: "unit",
  definition: "what a collection's own lengths are counted in",
  targetPageType: "page-type/unit",
  types: "ts",
} as const satisfies RelationProperty
