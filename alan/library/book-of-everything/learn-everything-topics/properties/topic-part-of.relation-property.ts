import type { Slug } from "@akasha/pages/page/slug"
import type { List } from "@akasha/pages/page-property"
import type { RelationProperty } from "@akasha/pages/relation-property"

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
