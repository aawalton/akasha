import type { TemperWeaponType } from "../temper-weapon-type.page-type.ts"

export const maul = {
  id: "01a05fd5-4dd6-7da7-8d0c-c665ebdc43a7",
  pageTypeSlug: "temper-weapon-type",
  slug: "maul",
  title: "Maul",
  key: "maul",
  enchantmentMultiplier: 1,
  esoWeaponType: "WEAPONTYPE_TWO_HANDED_HAMMER",
  isTwoHanded: true,
  weaponPower: 1571,
  validSlots: ["main-hand"],
  skillLineId: "weapon-two-handed",
} as const satisfies TemperWeaponType
