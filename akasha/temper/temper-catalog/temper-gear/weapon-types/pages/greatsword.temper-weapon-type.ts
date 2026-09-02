import type { TemperWeaponType } from "../temper-weapon-type.page-type.ts"

export const greatsword = {
  id: "01a05fd5-4dd4-7b69-bf24-b758da896322",
  pageTypeSlug: "temper-weapon-type",
  slug: "greatsword",
  title: "Greatsword",
  key: "greatsword",
  enchantmentMultiplier: 1,
  esoWeaponType: "WEAPONTYPE_TWO_HANDED_SWORD",
  isTwoHanded: true,
  weaponPower: 1571,
  validSlots: ["main-hand"],
  skillLineId: "weapon-two-handed",
} as const satisfies TemperWeaponType
