import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const role = {
  id: "01a05035-2609-769e-8bce-5f13a7ed3df4",
  type: "page-type/relation-property",
  slug: "role",
  propertySlug: "role",
  definition: "the role of a persona or a seat",
  targetPageType: "page-type/role",
  types: "ts",
} as const satisfies RelationProperty
