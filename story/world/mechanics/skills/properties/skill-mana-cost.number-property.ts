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
  createdAt: "2026-09-28T18:54:40.738Z",
  updatedAt: "2026-09-28T18:54:46.000Z",
} as const satisfies NumberProperty
