import type { Slug } from "@akasha/pages-system/page/slug"
import type { List } from "@akasha/pages-system/page-property"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type TopicRelatedSlugs = List<Slug>

export const topicRelatedSlugs = {
  id: "01a0655a-b2b5-710b-b693-bb9c1a6e2950",
  pageTypeSlug: "relation-property",
  slug: "topic-related-slugs",
  propertySlug: "related-slugs",
  definition: "the topics a topic reaches across to",
  targetPageTypeSlug: "page-type/all-about-alan-topic",
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
