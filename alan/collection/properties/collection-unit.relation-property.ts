import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const collectionUnit = {
  id: "01a063de-2c60-7013-90a9-52d3c0a8908c",
  type: "page-type/relation-property",
  slug: "collection-unit",
  propertySlug: "unit",
  definition: "the unit of a collection's own length",
  targetPageType: "page-type/unit",
  types: "ts",
} as const satisfies RelationProperty
