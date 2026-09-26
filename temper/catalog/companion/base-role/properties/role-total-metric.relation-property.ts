import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const roleTotalMetric = {
  id: "01a0df21-8c4e-789e-9dd7-201540a55991",
  type: "page-type/relation-property",
  slug: "role-total-metric",
  propertySlug: "total-metric",
  definition: "the stat a companion playing a role is scored by",
  targetPageType: "page-type/temper-metric",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A companion build's overall stats show the stat each of its roles is scored by.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
