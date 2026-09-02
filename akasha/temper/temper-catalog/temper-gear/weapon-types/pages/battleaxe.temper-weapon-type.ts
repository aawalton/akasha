import type { TemperWeaponType } from "../temper-weapon-type.page-type.ts"

export const battleaxe = {
  id: "01a05fd5-4dd3-7e33-9f95-838e505b80c8",
  pageTypeSlug: "temper-weapon-type",
  slug: "battleaxe",
  title: "Battleaxe",
  key: "battleaxe",
  enchantmentMultiplier: 1,
  esoWeaponType: "WEAPONTYPE_TWO_HANDED_AXE",
  isTwoHanded: true,
  weaponPower: 1571,
  validSlots: ["main-hand"],
  skillLineId: "weapon-two-handed",
} as const satisfies TemperWeaponType
