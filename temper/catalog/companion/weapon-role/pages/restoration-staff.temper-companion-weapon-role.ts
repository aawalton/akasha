import type { TemperCompanionWeaponRole } from "akasha/temper/catalog/companion/weapon-role/temper-companion-weapon-role.page-type.types.ts"

export const restorationStaff = {
  id: "01a05fcd-ea72-7636-b9d7-d1afc3c60823",
  type: "page-type/temper-companion-weapon-role",
  slug: "restoration-staff",
  key: "restoration-staff",
  title: "Restoration Staff",
  weaponSkillLineId: "temper-companion-skill-line/weapon-restoration-staff",
  validMainHandWeaponTypes: ["restoration-staff"],
  createdAt: "2026-09-02T01:48:45.554Z",
  updatedAt: "2026-09-22T22:13:28.000Z",
} as const satisfies TemperCompanionWeaponRole
