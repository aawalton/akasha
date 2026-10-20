import type { TemperWeaponType } from "akasha/temper/catalog/gear/temper-weapon-type/temper-weapon-type.page-type.types.ts"

export const infernoStaff = {
  id: "019e46b6-4095-718f-8cbf-783b175896ca",
  type: "page-type/temper-weapon-type",
  slug: "inferno-staff",
  title: "Inferno Staff",
  key: "inferno-staff",
  enchantmentMultiplier: 1,
  esoWeaponType: "WEAPONTYPE_FIRE_STAFF",
  isTwoHanded: true,
  validSlots: ["temper-weapon-slot/main-hand"],
  skillLineId: "temper-skill-line/weapon-destruction-staff",
  hashPlace: 6,
  esoWeaponTypeNumber: 12,
  createdAt: "2026-05-20T18:46:49.749Z",
  updatedAt: "2026-10-20T19:44:32.491Z",
} as const satisfies TemperWeaponType
