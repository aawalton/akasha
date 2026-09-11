import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const targetPageType = {
  id: "01a04a08-fcf3-7001-9f43-3bfdc57c3676",
  type: "relation-property",
  slug: "target-page-type",
  propertySlug: "target-page-type",
  definition: "the page type this relation's value names, or a page type extending it",
  targetPageType: "page-type/page-type",
  types: "ts",
} as const satisfies RelationProperty
