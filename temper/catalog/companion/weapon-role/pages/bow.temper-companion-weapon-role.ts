import type { TemperCompanionWeaponRole } from "akasha/temper/catalog/companion/weapon-role/temper-companion-weapon-role.page-type.types.ts"

export const bow = {
  id: "01a05fcd-ea70-7e3e-9094-42c56509ff53",
  type: "page-type/temper-companion-weapon-role",
  slug: "bow",
  key: "bow",
  title: "Bow",
  weaponSkillLineId: "temper-companion-skill-line/weapon-bow",
  validMainHandWeaponTypes: ["bow"],
} as const satisfies TemperCompanionWeaponRole
