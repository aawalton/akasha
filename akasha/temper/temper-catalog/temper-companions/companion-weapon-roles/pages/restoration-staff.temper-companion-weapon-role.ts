import type { TemperCompanionWeaponRole } from "../temper-companion-weapon-role.page-type.ts"

export const restorationStaff = {
  id: "01a05fcd-ea72-7636-b9d7-d1afc3c60823",
  pageTypeSlug: "temper-companion-weapon-role",
  slug: "restoration-staff",
  key: "restoration-staff",
  title: "Restoration Staff",
  weaponSkillLineId: "weapon-restoration-staff",
  validMainHandWeaponTypes: ["restoration-staff"],
} as const satisfies TemperCompanionWeaponRole
