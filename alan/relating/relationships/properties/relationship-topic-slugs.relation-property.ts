import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type RelationshipTopicSlugs = Slug

export const relationshipTopicSlugs = {
  id: "01a06594-c6e2-763a-bd70-ce2e63227768",
  pageTypeSlug: "relation-property",
  slug: "relationship-topic-slugs",
  propertySlug: "relationship-topic-slugs",
  definition: "the subjects Alan and this person talk about",
  targetPageTypeSlug: "page-type/relationship-topic",
} as const satisfies RelationProperty
