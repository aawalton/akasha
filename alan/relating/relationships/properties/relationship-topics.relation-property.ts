import type { Slug } from "akasha/pages/properties/slug.text-property.ts"
import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"
import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"

export type RelationshipTopics = List<Slug>

export const relationshipTopics = {
  id: "01a06594-c6e2-763a-bd70-ce2e63227768",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "relationship-topics",
  propertySlug: "relationship-topics",
  definition: "the subjects Alan and this person talk about",
  targetPageType: "page-type/relationship-topic",
} as const satisfies RelationProperty
