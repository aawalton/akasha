import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const topicPartOf = {
  id: "01a0659f-93da-700f-8f41-8714236db415",
  type: "page-type/multi-relation-property",
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
  createdAt: "2026-09-03T04:55:52.026Z",
  updatedAt: "2026-09-22T14:01:38.000Z",
} as const satisfies MultiRelationProperty
