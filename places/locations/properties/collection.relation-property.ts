import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type Collection = Slug

export const collection = {
  id: "01a06583-acfb-7d2e-8d12-b5df7cabbd81",
  pageTypeSlug: "relation-property",
  slug: "collection",
  propertySlug: "collection",
  definition: "the location collection a place or an offer is part of",
  targetPageTypeSlug: "page-type/location-collection",
} as const satisfies RelationProperty
