import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const traitCharacter = {
  id: "01a0ca5d-b332-7057-9c07-e79aaa1dd975",
  type: "page-type/relation-property",
  slug: "trait-character",
  propertySlug: "character",
  definition: "the character a trait holds for",
  targetPageType: "page-type/world-character",
  types: "ts",
  createdAt: "2026-09-22T18:25:33.490Z",
  updatedAt: "2026-09-26T17:44:02.000Z",
} as const satisfies RelationProperty
