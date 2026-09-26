import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const twoHandedWeaponDamage = {
  id: "01a0de9c-51fd-7669-b094-c1231a999391",
  type: "page-type/number-property",
  slug: "two-handed-weapon-damage",
  propertySlug: "two-handed-weapon-damage",
  definition: "the weapon damage a two-handed companion weapon of a quality gives",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
