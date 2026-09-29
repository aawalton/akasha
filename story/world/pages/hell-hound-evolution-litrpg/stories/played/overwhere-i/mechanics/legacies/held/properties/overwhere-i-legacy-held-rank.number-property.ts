import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const overwhereILegacyHeldRank = {
  id: "01a0ed17-2f4f-7510-b300-49237aa1936b",
  type: "page-type/number-property",
  slug: "overwhere-i-legacy-held-rank",
  propertySlug: "rank",
  definition: "the rank, counted from one, a legacy held in Overwhere I has reached",
  nullable: false,
  max: 5,
  types: "ts",
} as const satisfies NumberProperty
