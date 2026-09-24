import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const equipmentAttack = {
  id: "01a0c63a-2528-71ac-bc9c-63b3765dbf24",
  type: "page-type/number-property",
  slug: "equipment-attack",
  propertySlug: "attack",
  definition: "what a thing adds to the strikes its bearer lands",
  nullable: false,
  max: null,
  types: "ts",
} as const satisfies NumberProperty
