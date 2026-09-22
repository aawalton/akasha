import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const attributeCharacter = {
  id: "01a0c9f6-cecf-7986-8d52-9c24855ccfe5",
  type: "page-type/relation-property",
  slug: "attribute-character",
  propertySlug: "character",
  definition: "the character whose attribute this is",
  targetPageType: "page-type/character",
  types: "ts",
} as const satisfies RelationProperty
