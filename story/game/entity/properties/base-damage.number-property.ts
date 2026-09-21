import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const baseDamage = {
  id: "01a0c63e-761e-774d-9f50-ef6394f2a9a4",
  type: "page-type/number-property",
  slug: "base-damage",
  propertySlug: "base-damage",
  definition: "what an entity's strike is worth before the strike is gated or grown",
  nullable: false,
  max: null,
  types: "ts",
} as const satisfies NumberProperty
