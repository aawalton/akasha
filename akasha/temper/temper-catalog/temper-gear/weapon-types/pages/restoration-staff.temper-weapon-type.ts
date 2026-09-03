import type { TemperWeaponType } from "../temper-weapon-type.page-type.ts"

export const restorationStaff = {
  id: "019e46b6-4098-7f3e-a6ab-4975269d4956",
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
