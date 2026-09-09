import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type RelationshipTopics = Slug

export const relationshipTopics = {
  id: "01a06594-c6e2-763a-bd70-ce2e63227768",
  pageTypeSlug: "relation-property",
  slug: "relationship-topics",
  propertySlug: "relationship-topics",
  definition: "the subjects Alan and this person talk about",
  targetPageType: "page-type/relationship-topic",
} as const satisfies RelationProperty
