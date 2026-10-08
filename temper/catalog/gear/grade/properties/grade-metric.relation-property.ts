import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const gradeMetric = {
  id: "01a0d3e2-9891-7087-bb1d-2fd35c9c6d82",
  type: "page-type/relation-property",
  slug: "grade-metric",
  propertySlug: "metric",
  definition: "the number a grade's worth moves",
  targetPageType: "page-type/temper-metric-tree",
  types: "ts",
  createdAt: "2026-09-24T14:47:17.905Z",
  updatedAt: "2026-09-24T14:48:23.000Z",
} as const satisfies RelationProperty
