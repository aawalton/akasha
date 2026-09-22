import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const topicPartOf = {
  id: "01a0659f-93da-700f-8f41-8714236db415",
  type: "page-type/relation-property",
  slug: "topic-part-of",
  propertySlug: "part-of",
  definition: "a topic's parent topics",
  targetPageType: "page-type/learn-everything-topic",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The topics under a topic are the topics naming that topic here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The whole map sits under nothing.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
