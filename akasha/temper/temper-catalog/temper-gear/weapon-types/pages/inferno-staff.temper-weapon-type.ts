import type { TemperWeaponType } from "../temper-weapon-type.page-type.ts"

export const infernoStaff = {
  id: "01a05fd5-4dd4-77db-b712-1a73a91bf52d",
  pageTypeSlug: "temper-weapon-type",
  slug: "inferno-staff",
  title: "Inferno Staff",
  key: "inferno-staff",
  enchantmentMultiplier: 1,
  esoWeaponType: "WEAPONTYPE_FIRE_STAFF",
  isTwoHanded: true,
  weaponPower: 1335,
  validSlots: ["main-hand"],
  skillLineId: "weapon-destruction-staff",
} as const satisfies TemperWeaponType
