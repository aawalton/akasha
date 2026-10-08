import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const metricOfCharacter = {
  id: "01a0ca08-086e-72a3-99d9-49b538d216cd",
  type: "page-type/relation-property",
  slug: "metric-of-character",
  propertySlug: "character",
  definition: "the character whose metric this is",
  targetPageType: "page-type/world-character",
  types: "ts",
  createdAt: "2026-09-22T16:51:59.214Z",
  updatedAt: "2026-09-26T17:44:02.000Z",
} as const satisfies RelationProperty
