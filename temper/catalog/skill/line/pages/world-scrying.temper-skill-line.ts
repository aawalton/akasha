import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const worldScrying = {
  id: "019e61dc-f1d5-77c4-b3f0-98289f7972e4",
  type: "page-type/temper-skill-line",
  slug: "world-scrying",
  title: "Scrying",
  key: "world-scrying",
  displayOrder: 33,
  esoSkillLineId: 155,
  maxRank: 10,
  category: "temper-skill-line-category/world",
} as const satisfies TemperSkillLine
