import type { TemperWeaponType } from "../temper-weapon-type.page-type.ts"

export const mace = {
  id: "019e46b6-4089-7fbb-8e33-bdbbe8a10106",
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
