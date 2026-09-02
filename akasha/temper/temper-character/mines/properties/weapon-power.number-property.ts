import type { NumberProperty } from "@akasha/pages-system/number-property"

export type WeaponPower = number

export const weaponPower = {
  id: "01a05fcd-f556-71bb-8465-689adcc32b4a",
  pageTypeSlug: "number-property",
  slug: "weapon-power",
  propertySlug: "weapon-power",
  definition: "how much damage a weapon is worth",
  max: null,
} as const satisfies NumberProperty
