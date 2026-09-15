import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const topicPartOf = {
  id: "01a0659f-93da-700f-8f41-8714236db415",
  type: "relation-property",
  slug: "topic-part-of",
  propertySlug: "part-of",
  definition: "the topics a topic sits under",
  targetPageType: "page-type/learn-everything-topic",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The topics under a topic are the topics naming that topic here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The whole map sits under nothing.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
