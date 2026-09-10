import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const relationshipTopicPeople = {
  id: "01a0658a-170f-75d8-bcba-4ab449f43c3b",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "relationship-topic-people",
  propertySlug: "relationship-topic-people",
  definition: "the people this topic is held with",
  targetPageType: "page-type/person",
  types: "ts",
} as const satisfies RelationProperty
