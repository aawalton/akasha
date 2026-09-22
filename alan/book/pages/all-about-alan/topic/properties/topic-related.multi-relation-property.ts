import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const topicRelated = {
  id: "01a0655a-b2b5-710b-b693-bb9c1a6e2950",
  type: "page-type/multi-relation-property",
  slug: "topic-related",
  propertySlug: "related",
  definition: "the topics a topic reaches across to",
  targetPageType: "page-type/all-about-alan-topic",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A topic reached across to sits under no obligation to reach back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A topic already reached through a parent is named here as well.",
    },
  ],
  types: "ts",
} as const satisfies MultiRelationProperty
