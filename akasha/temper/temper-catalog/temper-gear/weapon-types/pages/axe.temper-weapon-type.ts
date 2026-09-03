import type { TemperWeaponType } from "../temper-weapon-type.page-type.ts"

export const axe = {
  id: "019e46b6-4086-7d7f-a6f1-71970ee65aad",
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
