import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const recordBook = {
  id: "01a0657d-b91d-7100-a6a6-4e66e1a75ab3",
  type: "page-type/relation-property",
  slug: "record-book",
  propertySlug: "book",
  definition: "the book a book record is kept about",
  targetPageType: "page-type/alan-book",
  types: "ts",
  createdAt: "2026-09-03T04:18:53.341Z",
  updatedAt: "2026-10-30T14:53:40.449Z",
} as const satisfies RelationProperty
