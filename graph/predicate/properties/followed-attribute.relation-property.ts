import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const followedAttribute = {
  id: "01a0aa5f-6087-7849-86c6-3e386cb2fb30",
  type: "page-type/relation-property",
  slug: "followed-attribute",
  propertySlug: "attribute",
  definition: "the attribute a predicate reads off an edge",
  targetPageType: "page-type/graph-attribute",
  types: "ts",
} as const satisfies RelationProperty
