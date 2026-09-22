import type { TemperWeaponType } from "akasha/temper/catalog/gear/temper-weapon-type/temper-weapon-type.page-type.types.ts"

export const dagger = {
  id: "019e46b6-408c-774e-b328-97c62f8e9d12",
  type: "page-type/temper-weapon-type",
  slug: "dagger",
  title: "Dagger",
  key: "dagger",
  enchantmentMultiplier: 0.5,
  esoWeaponType: "WEAPONTYPE_DAGGER",
  isTwoHanded: false,
  weaponPower: 1335,
  validSlots: ["temper-weapon-slot/main-hand"],
} as const satisfies TemperWeaponType
