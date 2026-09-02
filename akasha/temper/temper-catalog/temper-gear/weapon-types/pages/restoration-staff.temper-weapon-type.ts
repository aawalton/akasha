import type { TemperWeaponType } from "../temper-weapon-type.page-type.ts"

export const restorationStaff = {
  id: "01a05fd5-4dd6-7c24-bc4b-b2c7f220cc34",
  pageTypeSlug: "temper-weapon-type",
  slug: "restoration-staff",
  title: "Restoration Staff",
  key: "restoration-staff",
  enchantmentMultiplier: 1,
  esoWeaponType: "WEAPONTYPE_HEALING_STAFF",
  isTwoHanded: true,
  weaponPower: 1335,
  validSlots: ["main-hand"],
  skillLineId: "weapon-restoration-staff",
} as const satisfies TemperWeaponType
