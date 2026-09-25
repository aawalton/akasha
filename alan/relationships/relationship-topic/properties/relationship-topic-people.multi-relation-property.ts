import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const relationshipTopicPeople = {
  id: "01a0658a-170f-75d8-bcba-4ab449f43c3b",
  type: "page-type/multi-relation-property",
  slug: "relationship-topic-people",
  propertySlug: "relationship-topic-people",
  definition: "this topic's people",
  targetPageType: "page-type/person",
  types: "ts",
} as const satisfies MultiRelationProperty
