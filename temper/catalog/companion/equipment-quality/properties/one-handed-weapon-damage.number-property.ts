import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const oneHandedWeaponDamage = {
  id: "01a0de9c-51fd-7b4a-98b8-d052d60e888b",
  type: "page-type/number-property",
  slug: "one-handed-weapon-damage",
  propertySlug: "one-handed-weapon-damage",
  definition: "the weapon damage a one-handed companion weapon of a quality gives",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
