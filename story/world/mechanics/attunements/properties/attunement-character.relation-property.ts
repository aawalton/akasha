import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const attunementCharacter = {
  id: "01a0ca70-9905-732f-8689-204fd7b782d7",
  type: "page-type/relation-property",
  slug: "attunement-character",
  propertySlug: "character",
  definition: "the character an attunement is of",
  targetPageType: "page-type/world-character",
  types: "ts",
  createdAt: "2026-09-22T18:46:11.973Z",
  updatedAt: "2026-09-26T17:44:02.000Z",
} as const satisfies RelationProperty
