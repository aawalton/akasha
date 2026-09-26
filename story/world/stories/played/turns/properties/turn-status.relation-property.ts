import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const turnStatus = {
  id: "01a0dead-c0d9-76e9-b3f0-ef5d86237581",
  type: "page-type/relation-property",
  slug: "turn-status",
  propertySlug: "turn-status",
  definition: "whose move a played turn waits on",
  targetPageType: "page-type/turn-status",
  types: "ts",
} as const satisfies RelationProperty
