import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type TopicMasteryLevel = Slug

export const topicMasteryLevel = {
  id: "01a0784a-cdb7-7780-bc90-9d5f5a5cc720",
  pageTypeSlug: "relation-property",
  slug: "topic-mastery-level",
  propertySlug: "mastery-level",
  definition: "the rung a topic is scored at",
  targetPageType: "page-type/mastery-level",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A topic is scored at one rung.",
    },
  ],
} as const satisfies RelationProperty
