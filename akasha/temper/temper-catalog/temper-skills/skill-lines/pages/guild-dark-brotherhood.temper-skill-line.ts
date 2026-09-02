import type { TemperSkillLine } from "../temper-skill-line.page-type.ts"

export const guildDarkBrotherhood = {
  id: "01a05fce-2978-7fb4-92d6-e8655702bd8f",
  pageTypeSlug: "temper-skill-line",
  slug: "guild-dark-brotherhood",
  title: "Dark Brotherhood",
  key: "guild-dark-brotherhood",
  displayOrder: 37,
  esoSkillLineId: 118,
  maxRank: 12,
  subcategoryId: "guild",
} as const satisfies TemperSkillLine
