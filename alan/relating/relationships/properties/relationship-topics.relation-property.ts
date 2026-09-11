import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const relationshipTopics = {
  id: "01a06594-c6e2-763a-bd70-ce2e63227768",
  type: "relation-property",
  slug: "relationship-topics",
  propertySlug: "relationship-topics",
  definition: "the subjects Alan and this person talk about",
  targetPageType: "page-type/relationship-topic",
  types: "ts",
} as const satisfies RelationProperty
