import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const loreBookCollection = {
  id: "01a0d5da-b5a0-7015-ad40-22e6b334eb01",
  type: "page-type/relation-property",
  slug: "lore-book-collection",
  propertySlug: "collection",
  definition: "the lore collection a book belongs to",
  targetPageType: "page-type/temper-lore-collection",
  types: "ts",
  createdAt: "2026-09-24T23:57:55.488Z",
  updatedAt: "2026-09-24T23:58:01.000Z",
} as const satisfies RelationProperty
