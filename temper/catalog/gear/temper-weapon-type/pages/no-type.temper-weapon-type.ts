import type { TemperWeaponType } from "akasha/temper/catalog/gear/temper-weapon-type/temper-weapon-type.page-type.types.ts"

export const noType = {
  id: "019e46b6-407f-7bfa-a955-49524e837b1b",
  type: "page-type/temper-weapon-type",
  slug: "no-type",
  title: "No Type",
  key: "no-type",
  enchantmentMultiplier: 0,
  esoWeaponType: "WEAPONTYPE_NONE",
  isTwoHanded: false,
  weaponPower: 0,
  validSlots: ["temper-weapon-slot/main-hand"],
} as const satisfies TemperWeaponType
