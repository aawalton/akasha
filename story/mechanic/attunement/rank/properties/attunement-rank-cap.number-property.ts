import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const attunementRankCap = {
  id: "01a0ca71-2878-7d8f-80d3-70031693ea89",
  type: "page-type/number-property",
  slug: "attunement-rank-cap",
  propertySlug: "cap",
  definition: "the counter at which an attunement climbs past a rung",
  nullable: false,
  max: null,
  types: "ts",
} as const satisfies NumberProperty
