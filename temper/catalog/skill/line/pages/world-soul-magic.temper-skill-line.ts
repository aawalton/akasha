import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const worldSoulMagic = {
  id: "019e61dc-f1d1-785d-be2c-8b63937594ad",
  type: "page-type/temper-skill-line",
  slug: "world-soul-magic",
  title: "Soul Magic",
  key: "world-soul-magic",
  displayOrder: 34,
  esoSkillLineId: 72,
  maxRank: 6,
  category: "temper-skill-line-category/world",
} as const satisfies TemperSkillLine
