import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const heldClass = {
  id: "01a0f396-8662-7781-af11-69b5b558bc06",
  type: "page-type/relation-property",
  slug: "held-class",
  propertySlug: "class",
  definition: "the world's class a class held is a holding of",
  targetPageType: "page-type/world-class",
  types: "ts",
} as const satisfies RelationProperty
