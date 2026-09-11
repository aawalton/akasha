import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const topicRelated = {
  id: "01a0655a-b2b5-710b-b693-bb9c1a6e2950",
  type: "relation-property",
  slug: "topic-related",
  propertySlug: "related",
  definition: "the topics a topic reaches across to",
  targetPageType: "page-type/all-about-alan-topic",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A topic reached across to sits under no obligation to reach back.",
    },
    {
      invariantKind: "departure",
      statement: "A topic already reached through a parent is named here as well.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
