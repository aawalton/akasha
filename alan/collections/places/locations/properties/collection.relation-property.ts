import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const collection = {
  id: "01a06583-acfb-7d2e-8d12-b5df7cabbd81",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "collection",
  propertySlug: "collection",
  definition: "the location collection a place or an offer is part of",
  targetPageType: "page-type/location-collection",
  types: "ts",
} as const satisfies RelationProperty
