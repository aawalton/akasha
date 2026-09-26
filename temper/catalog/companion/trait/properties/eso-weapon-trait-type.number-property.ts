import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const esoWeaponTraitType = {
  id: "01a0deca-8f2d-7710-b565-731ac221bf91",
  type: "page-type/number-property",
  slug: "eso-weapon-trait-type",
  propertySlug: "eso-weapon-trait-type",
  definition: "the number the game gives a companion trait worked into a weapon",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
