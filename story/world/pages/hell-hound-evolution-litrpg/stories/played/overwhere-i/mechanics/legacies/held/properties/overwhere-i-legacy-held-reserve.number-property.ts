import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const overwhereILegacyHeldReserve = {
  id: "01a0ed17-2f4f-7c48-b39f-2fdce9a73b3e",
  type: "page-type/number-property",
  slug: "overwhere-i-legacy-held-reserve",
  propertySlug: "reserve",
  definition: "the most each elemental reserve of a legacy held in Overwhere I holds at its rank",
  nullable: false,
  max: null,
  types: "ts",
} as const satisfies NumberProperty
