import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const companionGradeMetric = {
  id: "01a0d3e2-cba6-7b84-8ef9-d1f961770e54",
  type: "page-type/relation-property",
  slug: "companion-grade-metric",
  propertySlug: "metric",
  definition: "the companion number a grade's worth moves",
  targetPageType: "page-type/temper-companion-passive-metric",
  types: "ts",
} as const satisfies RelationProperty
