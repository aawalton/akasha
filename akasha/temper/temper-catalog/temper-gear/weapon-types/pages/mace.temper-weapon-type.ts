import type { TemperWeaponType } from "../temper-weapon-type.page-type.ts"

export const mace = {
  id: "01a05fd5-4dd5-74e6-b1eb-d8ee14ea3fc0",
  pageTypeSlug: "temper-weapon-type",
  slug: "mace",
  title: "Mace",
  key: "mace",
  enchantmentMultiplier: 0.5,
  esoWeaponType: "WEAPONTYPE_HAMMER",
  isTwoHanded: false,
  weaponPower: 1335,
  validSlots: ["main-hand"],
  skillLineId: "weapon-one-hand",
} as const satisfies TemperWeaponType
