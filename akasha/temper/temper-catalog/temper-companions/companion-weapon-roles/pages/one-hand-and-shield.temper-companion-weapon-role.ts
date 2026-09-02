import type { TemperCompanionWeaponRole } from "../temper-companion-weapon-role.page-type.ts"

export const oneHandAndShield = {
  id: "01a05fcd-ea72-7bb9-926c-f2d5fe1acf40",
  pageTypeSlug: "temper-companion-weapon-role",
  slug: "one-hand-and-shield",
  key: "one-hand-and-shield",
  title: "One Hand and Shield",
  weaponSkillLineId: "weapon-one-hand-shield",
  validMainHandWeaponTypes: ["sword", "axe", "mace", "dagger"],
  validOffHandWeaponTypes: ["shield"],
} as const satisfies TemperCompanionWeaponRole
