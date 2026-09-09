import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type RelationshipTopicParent = Slug

export const relationshipTopicParent = {
  id: "01a0658a-170f-7c05-8369-b3621821f19c",
  pageTypeSlug: "relation-property",
  slug: "relationship-topic-parent",
  propertySlug: "relationship-topic-parent",
  definition: "the relationship topic this one sits inside",
  targetPageType: "page-type/relationship-topic",
} as const satisfies RelationProperty
