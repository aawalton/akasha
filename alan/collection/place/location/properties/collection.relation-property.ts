import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const collection = {
  id: "01a06583-acfb-7d2e-8d12-b5df7cabbd81",
  type: "page-type/relation-property",
  slug: "collection",
  propertySlug: "collection",
  definition: "the location collection holding a place or an offer",
  targetPageType: "page-type/location-collection",
  types: "ts",
} as const satisfies RelationProperty
