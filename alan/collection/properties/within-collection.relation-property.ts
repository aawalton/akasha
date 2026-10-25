import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const withinCollection = {
  id: "01a174a8-86b5-7f67-b47d-067befff6b69",
  type: "page-type/relation-property",
  slug: "within-collection",
  propertySlug: "collection",
  definition: "a collection another collection sits inside",
  targetPageType: "page-type/collection",
  types: "ts",
  createdAt: "2026-10-25T20:02:44.020Z",
  updatedAt: "2026-10-25T20:02:44.020Z",
} as const satisfies RelationProperty
