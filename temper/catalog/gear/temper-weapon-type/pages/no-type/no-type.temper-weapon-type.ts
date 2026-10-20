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
  validSlots: ["temper-weapon-slot/main-hand"],
  hashPlace: 10,
  esoWeaponTypeNumber: 0,
  createdAt: "2026-05-20T18:46:49.727Z",
  updatedAt: "2026-10-20T19:44:32.491Z",
} as const satisfies TemperWeaponType
