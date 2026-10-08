import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const answeredBy = {
  id: "01a053e6-3585-7b1a-86ec-d3f1f6b2169f",
  type: "page-type/relation-property",
  slug: "answered-by",
  propertySlug: "answered-by",
  definition: "the persona answering a person",
  targetPageType: "page-type/persona",
  types: "ts",
  createdAt: "2026-08-30T18:19:51.045Z",
  updatedAt: "2026-09-22T14:08:59.000Z",
} as const satisfies RelationProperty
