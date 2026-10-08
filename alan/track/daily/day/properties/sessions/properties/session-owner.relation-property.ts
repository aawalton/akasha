import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const sessionOwner = {
  id: "01a05fd8-c30f-7600-86de-1d33a70265bd",
  type: "page-type/relation-property",
  slug: "session-owner",
  propertySlug: "owner",
  definition: "the person a record belongs to",
  targetPageType: "page-type/person",
  types: "ts",
  createdAt: "2026-09-02T02:00:36.367Z",
  updatedAt: "2026-09-22T15:36:26.000Z",
} as const satisfies RelationProperty
