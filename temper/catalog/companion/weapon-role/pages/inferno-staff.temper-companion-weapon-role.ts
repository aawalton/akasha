import type { TemperCompanionWeaponRole } from "akasha/temper/catalog/companion/weapon-role/temper-companion-weapon-role.page-type.types.ts"

export const infernoStaff = {
  id: "01a05fcd-ea71-79ef-b6e3-e8e7c17c5a23",
  type: "page-type/temper-companion-weapon-role",
  slug: "inferno-staff",
  key: "inferno-staff",
  title: "Inferno Staff",
  weaponSkillLineId: "temper-companion-skill-line/weapon-destruction-staff",
  validMainHandWeaponTypes: ["inferno-staff"],
} as const satisfies TemperCompanionWeaponRole
