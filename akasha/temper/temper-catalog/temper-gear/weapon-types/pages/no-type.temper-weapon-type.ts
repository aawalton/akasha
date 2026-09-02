import type { TemperWeaponType } from "../temper-weapon-type.page-type.ts"

export const noType = {
  id: "01a05fd5-4dd6-7ec5-917e-5889f549f5e0",
  pageTypeSlug: "temper-weapon-type",
  slug: "no-type",
  title: "No Type",
  key: "no-type",
  enchantmentMultiplier: 0,
  esoWeaponType: "WEAPONTYPE_NONE",
  isTwoHanded: false,
  weaponPower: 0,
  validSlots: ["main-hand"],
} as const satisfies TemperWeaponType
