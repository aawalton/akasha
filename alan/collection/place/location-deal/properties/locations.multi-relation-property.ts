import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const locations = {
  id: "01a06585-5fc5-7f40-b744-a7962cb2915f",
  type: "page-type/multi-relation-property",
  slug: "locations",
  propertySlug: "locations",
  definition: "the places where a person can use the offer",
  targetPageType: "page-type/location",
  types: "ts",
  createdAt: "2026-09-03T04:27:14.757Z",
  updatedAt: "2026-10-30T15:13:09.003Z",
} as const satisfies MultiRelationProperty
