import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type Collection = Slug

export const collection = {
  id: "01a06585-5fc5-7759-a7f6-f7cbcaf30af8",
  pageTypeSlug: "relation-property",
  slug: "collection",
  propertySlug: "collection",
  definition: "the collection the offer is part of",
  targetPageTypeSlug: "page-type/location-collection",
} as const satisfies RelationProperty
