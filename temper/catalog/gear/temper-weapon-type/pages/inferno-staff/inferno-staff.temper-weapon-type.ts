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
  weaponPower: 1335,
  validSlots: ["temper-weapon-slot/main-hand"],
  skillLineId: "temper-skill-line/weapon-destruction-staff",
  hashPlace: 6,
  esoWeaponTypeNumber: 12,
  levelSlope: 14,
  levelIntercept: 313,
} as const satisfies TemperWeaponType
