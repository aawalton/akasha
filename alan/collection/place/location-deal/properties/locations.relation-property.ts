import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const locations = {
  id: "01a06585-5fc5-7f40-b744-a7962cb2915f",
  type: "page-type/relation-property",
  slug: "locations",
  propertySlug: "locations",
  definition: "the places where the offer is redeemable",
  targetPageType: "page-type/location",
  types: "ts",
} as const satisfies RelationProperty
