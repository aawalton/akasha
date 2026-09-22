import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const locations = {
  id: "01a06585-5fc5-7f40-b744-a7962cb2915f",
  type: "page-type/multi-relation-property",
  slug: "locations",
  propertySlug: "locations",
  definition: "the places where the offer is redeemable",
  targetPageType: "page-type/location",
  types: "ts",
} as const satisfies MultiRelationProperty
