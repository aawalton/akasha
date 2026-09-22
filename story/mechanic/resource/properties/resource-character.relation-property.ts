import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const resourceCharacter = {
  id: "01a0c9ef-b94c-72bd-86d5-fdfbfe5eb049",
  type: "page-type/relation-property",
  slug: "resource-character",
  propertySlug: "character",
  definition: "the character whose resource this is",
  targetPageType: "page-type/character",
  types: "ts",
} as const satisfies RelationProperty
