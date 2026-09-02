import type { TemperWeaponType } from "../temper-weapon-type.page-type.ts"

export const sword = {
  id: "01a05fd5-4dd6-774c-a391-1f187bd879e8",
  pageTypeSlug: "temper-weapon-type",
  slug: "sword",
  title: "Sword",
  key: "sword",
  enchantmentMultiplier: 0.5,
  esoWeaponType: "WEAPONTYPE_SWORD",
  isTwoHanded: false,
  weaponPower: 1335,
  validSlots: ["main-hand"],
  skillLineId: "weapon-one-hand",
} as const satisfies TemperWeaponType
