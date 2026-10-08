import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const relationshipTopicParent = {
  id: "01a0658a-170f-7c05-8369-b3621821f19c",
  type: "page-type/relation-property",
  slug: "relationship-topic-parent",
  propertySlug: "relationship-topic-parent",
  definition: "a relationship topic's parent topic",
  targetPageType: "page-type/relationship-topic",
  types: "ts",
  createdAt: "2026-09-03T04:32:23.823Z",
  updatedAt: "2026-09-25T13:01:00.000Z",
} as const satisfies RelationProperty
