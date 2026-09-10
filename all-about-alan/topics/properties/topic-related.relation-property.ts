import type { Slug } from "@akasha/pages/page/slug"
import type { List } from "@akasha/pages/page-property"
import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export type TopicRelated = List<Slug>

export const topicRelated = {
  id: "01a0655a-b2b5-710b-b693-bb9c1a6e2950",
  pageTypeSlug: "relation-property",
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
} as const satisfies RelationProperty
