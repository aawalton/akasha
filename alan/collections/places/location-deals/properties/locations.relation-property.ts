import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const locations = {
  id: "01a06585-5fc5-7f40-b744-a7962cb2915f",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "locations",
  propertySlug: "locations",
  definition: "the places the offer is redeemable at",
  targetPageType: "page-type/location",
  types: "ts",
} as const satisfies RelationProperty
