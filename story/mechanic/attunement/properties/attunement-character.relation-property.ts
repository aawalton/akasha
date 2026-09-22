import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const attunementCharacter = {
  id: "01a0ca70-9905-732f-8689-204fd7b782d7",
  type: "page-type/relation-property",
  slug: "attunement-character",
  propertySlug: "character",
  definition: "the character an attunement is of",
  targetPageType: "page-type/character",
  types: "ts",
} as const satisfies RelationProperty
