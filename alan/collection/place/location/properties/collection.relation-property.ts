import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const collection = {
  id: "01a06583-acfb-7d2e-8d12-b5df7cabbd81",
  type: "page-type/relation-property",
  slug: "collection",
  propertySlug: "collection",
  definition: "the location collection that holds a place or an offer",
  targetPageType: "page-type/location-collection",
  types: "ts",
  createdAt: "2026-09-03T04:25:23.451Z",
  updatedAt: "2026-10-30T15:14:52.791Z",
} as const satisfies RelationProperty
