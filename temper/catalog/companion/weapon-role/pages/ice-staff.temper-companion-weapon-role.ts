import type { TemperCompanionWeaponRole } from "akasha/temper/catalog/companion/weapon-role/temper-companion-weapon-role.page-type.types.ts"

export const iceStaff = {
  id: "01a05fcd-ea71-71e9-9633-bee687d43205",
  type: "page-type/temper-companion-weapon-role",
  slug: "ice-staff",
  key: "ice-staff",
  title: "Ice Staff",
  weaponSkillLineId: "temper-companion-skill-line/weapon-destruction-staff",
  validMainHandWeaponTypes: ["ice-staff"],
  createdAt: "2026-09-02T01:48:45.553Z",
  updatedAt: "2026-09-22T22:13:28.000Z",
} as const satisfies TemperCompanionWeaponRole
