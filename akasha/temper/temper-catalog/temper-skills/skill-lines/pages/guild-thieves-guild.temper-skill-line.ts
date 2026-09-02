import type { TemperSkillLine } from "../temper-skill-line.page-type.ts"

export const guildThievesGuild = {
  id: "01a05fce-2979-7c51-a8af-f3e90891a2dc",
  pageTypeSlug: "temper-skill-line",
  slug: "guild-thieves-guild",
  title: "Thieves Guild",
  key: "guild-thieves-guild",
  displayOrder: 41,
  esoSkillLineId: 117,
  maxRank: 12,
  subcategoryId: "guild",
} as const satisfies TemperSkillLine
