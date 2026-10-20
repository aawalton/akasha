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
  validSlots: ["temper-weapon-slot/main-hand"],
  hashPlace: 12,
  esoWeaponTypeNumber: 3,
  createdAt: "2026-05-20T18:46:49.731Z",
  updatedAt: "2026-10-20T19:44:32.491Z",
} as const satisfies TemperWeaponType
