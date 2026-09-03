import type { TemperWeaponType } from "../temper-weapon-type.page-type.ts"

export const dagger = {
  id: "019e46b6-408c-774e-b328-97c62f8e9d12",
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
