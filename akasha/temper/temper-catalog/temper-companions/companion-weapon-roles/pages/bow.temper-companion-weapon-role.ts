import type { TemperCompanionWeaponRole } from "../temper-companion-weapon-role.page-type.ts"

export const bow = {
  id: "01a05fcd-ea70-7e3e-9094-42c56509ff53",
  pageTypeSlug: "temper-companion-weapon-role",
  slug: "bow",
  key: "bow",
  title: "Bow",
  weaponSkillLineId: "weapon-bow",
  validMainHandWeaponTypes: ["bow"],
} as const satisfies TemperCompanionWeaponRole
