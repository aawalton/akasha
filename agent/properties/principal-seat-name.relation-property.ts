import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const principalSeatName = {
  id: "01a05439-6234-73fd-baf3-4e3b75e44f96",
  type: "page-type/relation-property",
  slug: "principal-seat-name",
  propertySlug: "principal-seat-name",
  definition: "the seat that runs a subagent",
  targetPageType: "page-type/seat",
  types: "ts",
  createdAt: "2026-08-30T19:50:41.972Z",
  updatedAt: "2026-09-25T17:52:44.000Z",
} as const satisfies RelationProperty
