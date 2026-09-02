import type { TemperWeaponType } from "../temper-weapon-type.page-type.ts"

export const bow = {
  id: "01a05fd5-4dd3-76d5-b917-5fc50ff3336a",
  pageTypeSlug: "temper-weapon-type",
  slug: "bow",
  title: "Bow",
  key: "bow",
  enchantmentMultiplier: 1,
  esoWeaponType: "WEAPONTYPE_BOW",
  isTwoHanded: true,
  weaponPower: 1335,
  validSlots: ["main-hand"],
  skillLineId: "weapon-bow",
} as const satisfies TemperWeaponType
