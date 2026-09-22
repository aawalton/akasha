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
  weaponPower: 1335,
  validSlots: ["temper-weapon-slot/main-hand"],
  skillLineId: "weapon-destruction-staff",
} as const satisfies TemperWeaponType
