import type { Slug } from "akasha/pages/properties/slug.text-property.ts"
import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"
import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"

export type Locations = List<Slug>

export const locations = {
  id: "01a06585-5fc5-7f40-b744-a7962cb2915f",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "locations",
  propertySlug: "locations",
  definition: "the places the offer is redeemable at",
  targetPageType: "page-type/location",
} as const satisfies RelationProperty
