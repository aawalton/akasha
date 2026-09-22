import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const guildFightersGuild = {
  id: "019e61dc-f1c8-721c-aecf-a156f080757f",
  type: "page-type/temper-skill-line",
  slug: "guild-fighters-guild",
  title: "Fighters Guild",
  key: "guild-fighters-guild",
  displayOrder: 38,
  esoSkillLineId: 45,
  maxRank: 10,
  category: "temper-skill-line-category/guild",
} as const satisfies TemperSkillLine
