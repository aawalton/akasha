import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type RelationshipTopicPeople = Slug

export const relationshipTopicPeople = {
  id: "01a0658a-170f-75d8-bcba-4ab449f43c3b",
  pageTypeSlug: "relation-property",
  slug: "relationship-topic-people",
  propertySlug: "relationship-topic-people",
  definition: "the people this topic is held with",
  targetPageType: "page-type/person",
} as const satisfies RelationProperty
