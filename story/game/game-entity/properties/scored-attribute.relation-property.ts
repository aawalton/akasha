import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const scoredAttribute = {
  id: "01a0c634-90e3-71d8-b791-bc240838dd53",
  type: "page-type/relation-property",
  slug: "scored-attribute",
  propertySlug: "attribute",
  definition: "a score's attribute",
  targetPageType: "page-type/game-attribute",
  types: "ts",
} as const satisfies RelationProperty
