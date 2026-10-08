import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const gradedThing = {
  id: "01a0d3e2-8850-732b-b0e9-db7bace7cd58",
  type: "page-type/relation-property",
  slug: "graded-thing",
  propertySlug: "thing",
  definition: "the enchant, trait, armor weight or weapon type a grade is of",
  targetPageType: "page-type/temper-catalog-thing",
  types: "ts",
  createdAt: "2026-09-24T14:47:13.744Z",
  updatedAt: "2026-09-27T03:05:02.000Z",
} as const satisfies RelationProperty
