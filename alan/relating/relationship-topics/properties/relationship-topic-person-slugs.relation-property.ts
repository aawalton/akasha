import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type RelationshipTopicPersonSlugs = Slug

export const relationshipTopicPersonSlugs = {
  id: "01a0658a-170f-75d8-bcba-4ab449f43c3b",
  pageTypeSlug: "relation-property",
  slug: "relationship-topic-person-slugs",
  propertySlug: "relationship-topic-person-slugs",
  definition: "the people this topic is held with",
  targetPageTypeSlug: "page-type/person",
} as const satisfies RelationProperty
