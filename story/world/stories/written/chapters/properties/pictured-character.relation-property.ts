import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const picturedCharacter = {
  id: "01a0fd84-f744-7145-9504-60a9794034d9",
  type: "page-type/relation-property",
  slug: "pictured-character",
  propertySlug: "character",
  definition: "the character a chapter's picture shows",
  targetPageType: "page-type/world-character",
  types: "ts",
} as const satisfies RelationProperty
