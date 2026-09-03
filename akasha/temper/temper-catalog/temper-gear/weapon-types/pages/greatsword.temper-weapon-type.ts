import type { TemperWeaponType } from "../temper-weapon-type.page-type.ts"

export const greatsword = {
  id: "019e46b6-408f-7101-8c11-f30ff5b7d117",
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
