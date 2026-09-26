import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const rankOfHaremHotelSkill = {
  id: "01a0de53-340a-7e2f-bec9-28a0069f8fce",
  type: "page-type/relation-property",
  slug: "rank-of-harem-hotel-skill",
  propertySlug: "rank",
  definition: "the rank a skill in the Harem Hotel is at",
  targetPageType: "page-type/harem-hotel-skill-rank",
  types: "ts",
} as const satisfies RelationProperty
