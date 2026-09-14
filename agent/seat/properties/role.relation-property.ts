import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const role = {
  id: "01a05035-2609-769e-8bce-5f13a7ed3df4",
  type: "relation-property",
  slug: "role",
  propertySlug: "role",
  definition: "the role a persona works in, or a seat is answerable for",
  targetPageType: "page-type/role",
  types: "ts",
} as const satisfies RelationProperty
