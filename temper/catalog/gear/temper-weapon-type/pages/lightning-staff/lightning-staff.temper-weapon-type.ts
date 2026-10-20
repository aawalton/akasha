import type { TemperWeaponType } from "akasha/temper/catalog/gear/temper-weapon-type/temper-weapon-type.page-type.types.ts"

export const lightningStaff = {
  id: "019e46b6-4097-7ac7-8bc9-adecad7a9a43",
  type: "page-type/temper-weapon-type",
  slug: "lightning-staff",
  title: "Lightning Staff",
  key: "lightning-staff",
  enchantmentMultiplier: 1,
  esoWeaponType: "WEAPONTYPE_LIGHTNING_STAFF",
  isTwoHanded: true,
  validSlots: ["temper-weapon-slot/main-hand"],
  skillLineId: "temper-skill-line/weapon-destruction-staff",
  hashPlace: 7,
  esoWeaponTypeNumber: 15,
  createdAt: "2026-05-20T18:46:49.751Z",
  updatedAt: "2026-10-20T19:44:32.491Z",
} as const satisfies TemperWeaponType
