import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type Locations = Slug

export const locations = {
  id: "01a06585-5fc5-7f40-b744-a7962cb2915f",
  pageTypeSlug: "relation-property",
  slug: "locations",
  propertySlug: "locations",
  definition: "the places the offer is redeemable at",
  targetPageTypeSlug: "page-type/location",
} as const satisfies RelationProperty
