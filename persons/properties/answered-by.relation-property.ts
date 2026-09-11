import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const answeredBy = {
  id: "01a053e6-3585-7b1a-86ec-d3f1f6b2169f",
  type: "relation-property",
  slug: "answered-by",
  propertySlug: "answered-by",
  definition: "the persona a person hears from",
  targetPageType: "page-type/persona",
  types: "ts",
} as const satisfies RelationProperty
