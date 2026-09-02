import type { TemperSkillLine } from "../temper-skill-line.page-type.ts"

export const worldWerewolf = {
  id: "01a05fce-298c-7c71-8722-0936d4fe8668",
  pageTypeSlug: "temper-skill-line",
  slug: "world-werewolf",
  title: "Werewolf",
  key: "world-werewolf",
  displayOrder: 36,
  esoSkillLineId: 50,
  maxRank: 10,
  subcategoryId: "world",
} as const satisfies TemperSkillLine
