import type { TemperWeaponType } from "../temper-weapon-type.page-type.ts"

export const dagger = {
  id: "01a05fd5-4dd3-7515-b69f-57fd5ffc6cfb",
  pageTypeSlug: "temper-weapon-type",
  slug: "dagger",
  title: "Dagger",
  key: "dagger",
  enchantmentMultiplier: 0.5,
  esoWeaponType: "WEAPONTYPE_DAGGER",
  isTwoHanded: false,
  weaponPower: 1335,
  validSlots: ["main-hand"],
  skillLineId: "weapon-one-hand",
} as const satisfies TemperWeaponType
