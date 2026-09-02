import type { TemperWeaponType } from "../temper-weapon-type.page-type.ts"

export const axe = {
  id: "01a05fd5-4dd2-7c73-8cc8-bfa801117173",
  pageTypeSlug: "temper-weapon-type",
  slug: "axe",
  title: "Axe",
  key: "axe",
  enchantmentMultiplier: 0.5,
  esoWeaponType: "WEAPONTYPE_AXE",
  isTwoHanded: false,
  weaponPower: 1335,
  validSlots: ["main-hand"],
  skillLineId: "weapon-one-hand",
} as const satisfies TemperWeaponType
