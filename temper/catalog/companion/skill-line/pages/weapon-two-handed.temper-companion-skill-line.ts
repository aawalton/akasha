import type { TemperCompanionSkillLine } from "akasha/temper/catalog/companion/skill-line/temper-companion-skill-line.page-type.types.ts"

export const weaponTwoHanded = {
  id: "01a05fce-c4ae-7b4d-8272-db110d080a7e",
  type: "page-type/temper-companion-skill-line",
  slug: "weapon-two-handed",
  key: "weapon-two-handed",
  title: "Two Handed",
  category: "weapon",
  displayOrder: 33,
} as const satisfies TemperCompanionSkillLine
