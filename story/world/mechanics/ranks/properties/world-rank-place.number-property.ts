import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const worldRankPlace = {
  id: "01a0dedc-02c5-75da-be67-49f476a7e712",
  type: "page-type/number-property",
  slug: "world-rank-place",
  propertySlug: "place",
  definition: "where a rung sits on its ladder, counted up from one at the bottom",
  nullable: false,
  max: null,
  types: "ts",
} as const satisfies NumberProperty
