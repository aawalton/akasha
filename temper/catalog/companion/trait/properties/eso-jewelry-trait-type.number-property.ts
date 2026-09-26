import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const esoJewelryTraitType = {
  id: "01a0deca-8f2d-7281-bce8-7c8c46af953e",
  type: "page-type/number-property",
  slug: "eso-jewelry-trait-type",
  propertySlug: "eso-jewelry-trait-type",
  definition: "the number the game gives a companion trait worked into jewelry",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
