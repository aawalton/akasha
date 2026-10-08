import type { TemperCompanionWeaponRole } from "akasha/temper/catalog/companion/weapon-role/temper-companion-weapon-role.page-type.types.ts"

export const lightningStaff = {
  id: "01a05fcd-ea71-7b74-8741-eebe625f216e",
  type: "page-type/temper-companion-weapon-role",
  slug: "lightning-staff",
  key: "lightning-staff",
  title: "Lightning Staff",
  weaponSkillLineId: "temper-companion-skill-line/weapon-destruction-staff",
  validMainHandWeaponTypes: ["lightning-staff"],
  createdAt: "2026-09-02T01:48:45.553Z",
  updatedAt: "2026-09-22T22:13:28.000Z",
} as const satisfies TemperCompanionWeaponRole
