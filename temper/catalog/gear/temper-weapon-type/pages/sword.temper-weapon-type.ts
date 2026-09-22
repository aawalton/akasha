import type { TemperWeaponType } from "akasha/temper/catalog/gear/temper-weapon-type/temper-weapon-type.page-type.types.ts"

export const sword = {
  id: "019e46b6-4083-7d4e-826d-2779d0f0ae3a",
  type: "page-type/temper-weapon-type",
  slug: "sword",
  title: "Sword",
  key: "sword",
  enchantmentMultiplier: 0.5,
  esoWeaponType: "WEAPONTYPE_SWORD",
  isTwoHanded: false,
  weaponPower: 1335,
  validSlots: ["temper-weapon-slot/main-hand"],
} as const satisfies TemperWeaponType
