import type { TemperCompanionWeaponRole } from "akasha/temper/catalog/companion/weapon-role/temper-companion-weapon-role.page-type.types.ts"

export const dualWield = {
  id: "01a05fcd-ea70-79c4-aaa6-56e61e68b51a",
  type: "page-type/temper-companion-weapon-role",
  slug: "dual-wield",
  key: "dual-wield",
  title: "Dual Wield",
  weaponSkillLineId: "temper-companion-skill-line/weapon-dual-wield",
  validMainHandWeaponTypes: ["sword", "axe", "mace", "dagger"],
  validOffHandWeaponTypes: ["sword", "axe", "mace", "dagger"],
} as const satisfies TemperCompanionWeaponRole
