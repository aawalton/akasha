import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const topicMasteryLevel = {
  id: "01a0784a-cdb7-7780-bc90-9d5f5a5cc720",
  type: "page-type/relation-property",
  slug: "topic-mastery-level",
  propertySlug: "mastery-level",
  definition: "the rung at which a topic is scored",
  targetPageType: "page-type/mastery-level",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A topic is scored at one rung.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
