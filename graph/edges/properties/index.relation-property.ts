import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const index = {
  id: "01a04fe8-cebe-7dd9-9d9f-9c476d9fd293",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "index",
  propertySlug: "index",
  definition: "the index answering an edge kind",
  targetPageType: "page-type/index",
  types: "ts",
} as const satisfies RelationProperty
