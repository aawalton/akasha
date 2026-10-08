import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const targetPageType = {
  id: "01a04a08-fcf3-7001-9f43-3bfdc57c3676",
  type: "page-type/relation-property",
  slug: "target-page-type",
  propertySlug: "target-page-type",
  definition: "the page type this relation's value names, or a page type extending it",
  targetPageType: "page-type/page-type",
  types: "ts",
  createdAt: "2026-08-28T20:21:38.163Z",
  updatedAt: "2026-09-15T16:30:55.000Z",
} as const satisfies RelationProperty
