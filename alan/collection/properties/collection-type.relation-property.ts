import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const collectionType = {
  id: "01a06935-8628-7809-8c7e-6a0cb1b50efc",
  type: "page-type/relation-property",
  slug: "collection-type",
  propertySlug: "collection-type",
  definition: "the kind a collection belongs to",
  targetPageType: "page-type/collection-type",
  types: "ts",
  createdAt: "2026-09-03T21:38:30.568Z",
  updatedAt: "2026-10-30T15:04:21.728Z",
} as const satisfies RelationProperty
