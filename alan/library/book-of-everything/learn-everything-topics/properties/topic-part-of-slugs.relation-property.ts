import type { Slug } from "@akasha/pages-system/page/slug"
import type { List } from "@akasha/pages-system/page-property"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type TopicPartOfSlugs = List<Slug>

export const topicPartOfSlugs = {
  id: "01a0659f-93da-700f-8f41-8714236db415",
  pageTypeSlug: "relation-property",
  slug: "topic-part-of-slugs",
  propertySlug: "part-of-slugs",
  definition: "the topics a topic sits under",
  targetPageTypeSlug: "page-type/learn-everything-topic",
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
