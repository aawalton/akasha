import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const itemCharacter = {
  id: "01a0ca42-28bb-7be1-bce7-8ad4a3e0e4ef",
  type: "page-type/relation-property",
  slug: "item-character",
  propertySlug: "character",
  definition: "the character an item is had by",
  targetPageType: "page-type/world-character",
  types: "ts",
  createdAt: "2026-09-22T17:55:28.571Z",
  updatedAt: "2026-09-26T17:47:23.000Z",
} as const satisfies RelationProperty
