import type { TemperCompanionWeaponRole } from "akasha/temper/catalog/companion/weapon-role/temper-companion-weapon-role.page-type.types.ts"

export const oneHandAndShield = {
  id: "01a05fcd-ea72-7bb9-926c-f2d5fe1acf40",
  type: "page-type/temper-companion-weapon-role",
  slug: "one-hand-and-shield",
  key: "one-hand-and-shield",
  title: "One Hand and Shield",
  weaponSkillLineId: "temper-companion-skill-line/weapon-one-hand-shield",
  validMainHandWeaponTypes: ["sword", "axe", "mace", "dagger"],
  validOffHandWeaponTypes: ["shield"],
} as const satisfies TemperCompanionWeaponRole
