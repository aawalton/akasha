import type { Slug } from "@akasha/pages-system/page/slug"
import type { List } from "@akasha/pages-system/page-property"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type TopicParentSlugs = List<Slug>

export const topicParentSlugs = {
  id: "01a0655a-b2b5-76ec-9521-af5a75eb52c5",
  pageTypeSlug: "relation-property",
  slug: "topic-parent-slugs",
  propertySlug: "parent-slugs",
  definition: "the topics a topic sits under",
  targetPageTypeSlug: "page-type/all-about-alan-topic",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A topic lists nothing standing beneath that topic.",
    },
    {
      invariantKind: "departure",
      statement: "This edge is read inverted.",
    },
  ],
} as const satisfies RelationProperty
