import type { Slug } from "akasha/pages/properties/slug.text-property.ts"
import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"
import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"

export type TopicPartOf = List<Slug>

export const topicPartOf = {
  id: "01a0659f-93da-700f-8f41-8714236db415",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "topic-part-of",
  propertySlug: "part-of",
  definition: "the topics a topic sits under",
  targetPageType: "page-type/learn-everything-topic",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The topics under a topic are the topics naming that topic here.",
    },
    {
      invariantKind: "departure",
      statement: "The whole map sits under nothing.",
    },
  ],
} as const satisfies RelationProperty
