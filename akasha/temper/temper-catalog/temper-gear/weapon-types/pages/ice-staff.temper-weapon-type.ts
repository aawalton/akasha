import type { TemperWeaponType } from "../temper-weapon-type.page-type.ts"

export const iceStaff = {
  id: "01a05fd5-4dd4-7c97-8e93-f7b239174ab0",
  pageTypeSlug: "temper-weapon-type",
  slug: "ice-staff",
  title: "Ice Staff",
  key: "ice-staff",
  enchantmentMultiplier: 1,
  esoWeaponType: "WEAPONTYPE_FROST_STAFF",
  isTwoHanded: true,
  weaponPower: 1335,
  validSlots: ["main-hand"],
  skillLineId: "weapon-destruction-staff",
} as const satisfies TemperWeaponType
