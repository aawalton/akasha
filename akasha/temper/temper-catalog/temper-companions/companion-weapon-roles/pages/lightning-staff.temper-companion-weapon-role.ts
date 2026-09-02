import type { TemperCompanionWeaponRole } from "../temper-companion-weapon-role.page-type.ts"

export const lightningStaff = {
  id: "01a05fcd-ea71-7b74-8741-eebe625f216e",
  pageTypeSlug: "temper-companion-weapon-role",
  slug: "lightning-staff",
  key: "lightning-staff",
  title: "Lightning Staff",
  weaponSkillLineId: "weapon-destruction-staff",
  validMainHandWeaponTypes: ["lightning-staff"],
} as const satisfies TemperCompanionWeaponRole
