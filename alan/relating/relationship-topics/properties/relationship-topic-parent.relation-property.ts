import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const relationshipTopicParent = {
  id: "01a0658a-170f-7c05-8369-b3621821f19c",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "relationship-topic-parent",
  propertySlug: "relationship-topic-parent",
  definition: "the relationship topic this one sits inside",
  targetPageType: "page-type/relationship-topic",
  types: "ts",
} as const satisfies RelationProperty
