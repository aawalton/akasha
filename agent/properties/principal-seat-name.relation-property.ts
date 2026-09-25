import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const principalSeatName = {
  id: "01a05439-6234-73fd-baf3-4e3b75e44f96",
  type: "page-type/relation-property",
  slug: "principal-seat-name",
  propertySlug: "principal-seat-name",
  definition: "the seat that runs a subagent",
  targetPageType: "page-type/seat",
  types: "ts",
} as const satisfies RelationProperty
