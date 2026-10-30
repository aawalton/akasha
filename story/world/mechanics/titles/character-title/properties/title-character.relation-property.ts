import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const titleCharacter = {
  id: "01a17ebe-19c4-7f99-a1cb-68543c9ea744",
  type: "page-type/relation-property",
  slug: "title-character",
  propertySlug: "character",
  definition: "the character that holds a character title",
  targetPageType: "page-type/world-character",
  types: "ts",
  createdAt: "2026-10-27T19:02:30.081Z",
  updatedAt: "2026-10-30T16:11:14.888Z",
} as const satisfies RelationProperty
