import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const topicMasteryLevel = {
  id: "01a0784a-cdb7-7780-bc90-9d5f5a5cc720",
  type: "page-type/relation-property",
  slug: "topic-mastery-level",
  propertySlug: "mastery-level",
  definition: "the mastery level Alan has in a topic",
  targetPageType: "page-type/mastery-level",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A topic is scored at one rung.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-06T19:56:03.383Z",
  updatedAt: "2026-10-30T16:23:44.175Z",
} as const satisfies RelationProperty
