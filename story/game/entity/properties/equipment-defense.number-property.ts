import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const equipmentDefense = {
  id: "01a0c63a-3b68-781a-ab35-e1db835bb92e",
  type: "page-type/number-property",
  slug: "equipment-defense",
  propertySlug: "defense",
  definition: "what a thing adds to how hard its bearer is to hit",
  nullable: false,
  max: null,
  types: "ts",
} as const satisfies NumberProperty
