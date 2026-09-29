import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const overwhereILegacyRefillMinutes = {
  id: "01a0ed17-2f4f-7b43-a482-13a72a220e11",
  type: "page-type/number-property",
  slug: "overwhere-i-legacy-refill-minutes",
  propertySlug: "refill-minutes",
  definition: "the minutes an emptied elemental reserve takes to fill again from within",
  nullable: false,
  max: null,
  types: "ts",
} as const satisfies NumberProperty
