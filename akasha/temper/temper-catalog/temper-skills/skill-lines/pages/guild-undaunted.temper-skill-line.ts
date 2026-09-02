import type { TemperSkillLine } from "../temper-skill-line.page-type.ts"

export const guildUndaunted = {
  id: "01a05fce-2979-7040-8ed8-8cec2c7e892d",
  pageTypeSlug: "temper-skill-line",
  slug: "guild-undaunted",
  title: "Undaunted",
  key: "guild-undaunted",
  displayOrder: 42,
  esoSkillLineId: 55,
  maxRank: 10,
  subcategoryId: "guild",
} as const satisfies TemperSkillLine
