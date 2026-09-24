import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const loreBookCollection = {
  id: "01a0d5da-b5a0-7015-ad40-22e6b334eb01",
  type: "page-type/relation-property",
  slug: "lore-book-collection",
  propertySlug: "collection",
  definition: "the lore collection a book belongs to",
  targetPageType: "page-type/temper-lore-collection",
  types: "ts",
} as const satisfies RelationProperty
