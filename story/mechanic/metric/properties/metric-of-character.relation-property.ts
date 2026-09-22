import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const metricOfCharacter = {
  id: "01a0ca08-086e-72a3-99d9-49b538d216cd",
  type: "page-type/relation-property",
  slug: "metric-of-character",
  propertySlug: "character",
  definition: "the character whose metric this is",
  targetPageType: "page-type/character",
  types: "ts",
} as const satisfies RelationProperty
