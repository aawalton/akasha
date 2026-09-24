import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const gradeMetric = {
  id: "01a0d3e2-9891-7087-bb1d-2fd35c9c6d82",
  type: "page-type/relation-property",
  slug: "grade-metric",
  propertySlug: "metric",
  definition: "the number a grade's worth moves",
  targetPageType: "page-type/temper-metric-tree",
  types: "ts",
} as const satisfies RelationProperty
