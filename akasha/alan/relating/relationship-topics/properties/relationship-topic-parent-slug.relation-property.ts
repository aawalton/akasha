import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type RelationshipTopicParentSlug = Slug

export const relationshipTopicParentSlug = {
  id: "01a0658a-170f-7c05-8369-b3621821f19c",
  pageTypeSlug: "relation-property",
  slug: "relationship-topic-parent-slug",
  propertySlug: "relationship-topic-parent-slug",
  definition: "the relationship topic this one sits inside",
  targetPageTypeSlug: "page-type/relationship-topic",
} as const satisfies RelationProperty
