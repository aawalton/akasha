import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const skillManaCost = {
  id: "01a0e95e-8462-7dbd-ad40-15a279a0aec3",
  type: "page-type/number-property",
  slug: "skill-mana-cost",
  propertySlug: "mana-cost",
  definition: "the mana a skill takes each time it is worked",
  nullable: false,
  max: null,
  types: "ts",
} as const satisfies NumberProperty
