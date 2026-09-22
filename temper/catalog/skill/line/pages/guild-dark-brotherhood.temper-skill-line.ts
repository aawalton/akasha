import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const guildDarkBrotherhood = {
  id: "019e61dc-f1cc-7801-8efa-dc724a1b4803",
  type: "page-type/temper-skill-line",
  slug: "guild-dark-brotherhood",
  title: "Dark Brotherhood",
  key: "guild-dark-brotherhood",
  displayOrder: 37,
  esoSkillLineId: 118,
  maxRank: 12,
  category: "temper-skill-line-category/guild",
} as const satisfies TemperSkillLine
