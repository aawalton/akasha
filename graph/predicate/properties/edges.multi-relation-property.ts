import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const edges = {
  id: "01a0a5df-1d6b-733c-84ad-4eb69c3a6f98",
  type: "page-type/multi-relation-property",
  slug: "edges",
  propertySlug: "edges",
  definition: "the edge kinds a predicate follows",
  targetPageType: "page-type/graph-edge",
  types: "ts",
} as const satisfies MultiRelationProperty
