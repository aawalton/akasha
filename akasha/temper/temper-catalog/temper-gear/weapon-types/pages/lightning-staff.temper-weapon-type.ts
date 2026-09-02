import type { TemperWeaponType } from "../temper-weapon-type.page-type.ts"

export const lightningStaff = {
  id: "01a05fd5-4dd4-7b11-9a99-991326f5fbac",
  pageTypeSlug: "temper-weapon-type",
  slug: "lightning-staff",
  title: "Lightning Staff",
  key: "lightning-staff",
  enchantmentMultiplier: 1,
  esoWeaponType: "WEAPONTYPE_LIGHTNING_STAFF",
  isTwoHanded: true,
  weaponPower: 1335,
  validSlots: ["main-hand"],
  skillLineId: "weapon-destruction-staff",
} as const satisfies TemperWeaponType
