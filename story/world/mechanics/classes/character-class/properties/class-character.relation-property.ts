import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const classCharacter = {
  id: "01a0f396-8662-7682-b73b-57c171e66c56",
  type: "page-type/relation-property",
  slug: "class-character",
  propertySlug: "character",
  definition: "the character a class held is the class of",
  targetPageType: "page-type/world-character",
  types: "ts",
} as const satisfies RelationProperty
