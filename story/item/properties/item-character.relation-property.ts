import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const itemCharacter = {
  id: "01a0ca42-28bb-7be1-bce7-8ad4a3e0e4ef",
  type: "page-type/relation-property",
  slug: "item-character",
  propertySlug: "character",
  definition: "the character an item is had by",
  targetPageType: "page-type/character",
  types: "ts",
} as const satisfies RelationProperty
