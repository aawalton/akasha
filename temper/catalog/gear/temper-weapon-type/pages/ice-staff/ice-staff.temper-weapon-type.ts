import type { TemperWeaponType } from "akasha/temper/catalog/gear/temper-weapon-type/temper-weapon-type.page-type.types.ts"

export const iceStaff = {
  id: "019e46b6-4096-7618-a107-04208bd01142",
  type: "page-type/temper-weapon-type",
  slug: "ice-staff",
  title: "Ice Staff",
  key: "ice-staff",
  enchantmentMultiplier: 1,
  esoWeaponType: "WEAPONTYPE_FROST_STAFF",
  isTwoHanded: true,
  validSlots: ["temper-weapon-slot/main-hand"],
  skillLineId: "temper-skill-line/weapon-destruction-staff",
  hashPlace: 5,
  esoWeaponTypeNumber: 13,
  createdAt: "2026-05-20T18:46:49.750Z",
  updatedAt: "2026-10-20T19:44:32.491Z",
} as const satisfies TemperWeaponType
