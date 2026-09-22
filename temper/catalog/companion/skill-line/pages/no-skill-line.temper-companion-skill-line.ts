import type { TemperCompanionSkillLine } from "akasha/temper/catalog/companion/skill-line/temper-companion-skill-line.page-type.types.ts"

export const noSkillLine = {
  id: "01a05fce-c4ab-7261-9e2e-6d39604d36cb",
  type: "page-type/temper-companion-skill-line",
  slug: "no-skill-line",
  key: "no-skill-line",
  title: "No Skill Line",
  category: "weapon",
  displayOrder: 0,
} as const satisfies TemperCompanionSkillLine
