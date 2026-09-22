import type { TemperCompanionSkillLine } from "akasha/temper/catalog/companion/skill-line/temper-companion-skill-line.page-type.types.ts"

export const guildMages = {
  id: "01a05fce-c4aa-73ec-b7dd-015aa470f0ad",
  type: "page-type/temper-companion-skill-line",
  slug: "guild-mages",
  key: "guild-mages",
  title: "Mages Guild",
  category: "guild",
  displayOrder: 40,
} as const satisfies TemperCompanionSkillLine
