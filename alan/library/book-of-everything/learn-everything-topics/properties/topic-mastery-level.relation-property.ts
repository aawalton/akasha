import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const topicMasteryLevel = {
  id: "01a0784a-cdb7-7780-bc90-9d5f5a5cc720",
  type: "relation-property",
  slug: "topic-mastery-level",
  propertySlug: "mastery-level",
  definition: "the rung a topic is scored at",
  targetPageType: "page-type/mastery-level",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A topic is scored at one rung.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
