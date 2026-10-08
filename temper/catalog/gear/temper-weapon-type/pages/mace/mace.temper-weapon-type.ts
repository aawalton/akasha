import type { TemperWeaponType } from "akasha/temper/catalog/gear/temper-weapon-type/temper-weapon-type.page-type.types.ts"

export const mace = {
  id: "019e46b6-4089-7fbb-8e33-bdbbe8a10106",
  type: "page-type/temper-weapon-type",
  slug: "mace",
  title: "Mace",
  key: "mace",
  enchantmentMultiplier: 0.5,
  esoWeaponType: "WEAPONTYPE_HAMMER",
  isTwoHanded: false,
  weaponPower: 1335,
  validSlots: ["temper-weapon-slot/main-hand"],
  hashPlace: 8,
  esoWeaponTypeNumber: 2,
  levelSlope: 14,
  levelIntercept: 313,
  createdAt: "2026-05-20T18:46:49.737Z",
  updatedAt: "2026-09-27T04:15:45.000Z",
} as const satisfies TemperWeaponType
