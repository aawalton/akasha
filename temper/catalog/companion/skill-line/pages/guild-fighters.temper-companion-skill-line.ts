import type { TemperCompanionSkillLine } from "akasha/temper/catalog/companion/skill-line/temper-companion-skill-line.page-type.types.ts"

export const guildFighters = {
  id: "01a05fce-c4aa-7211-9adc-931ef01ea52d",
  type: "page-type/temper-companion-skill-line",
  slug: "guild-fighters",
  key: "guild-fighters",
  title: "Fighters Guild",
  category: "guild",
  displayOrder: 39,
} as const satisfies TemperCompanionSkillLine
