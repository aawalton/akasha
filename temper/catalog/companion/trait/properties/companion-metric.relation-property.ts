import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const companionMetric = {
  id: "01a0d3d2-e04b-7a25-bebc-6c7c9d72dad7",
  type: "page-type/relation-property",
  slug: "companion-metric",
  propertySlug: "metric-id",
  definition: "the companion number an effect moves",
  targetPageType: "page-type/temper-companion-passive-metric",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The key is the one every reader of a companion effect spells.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-24T14:30:07.691Z",
  updatedAt: "2026-09-24T14:30:29.000Z",
} as const satisfies RelationProperty
