import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const childType = {
  id: "01a0683a-620a-753d-8ea2-a84aa847d5f4",
  type: "page-type/relation-property",
  slug: "child-type",
  propertySlug: "child-type",
  definition: "the page type of the pages a page gathers",
  targetPageType: "page-type/page-type",
  types: "ts",
  createdAt: "2026-09-03T17:04:11.786Z",
  updatedAt: "2026-09-15T16:30:55.000Z",
} as const satisfies RelationProperty
