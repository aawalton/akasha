import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const guildPsijicOrder = {
  id: "019e61dc-f1cb-771d-991d-3314effff2d6",
  type: "page-type/temper-skill-line",
  slug: "guild-psijic-order",
  title: "Psijic Order",
  key: "guild-psijic-order",
  displayOrder: 40,
  esoSkillLineId: 130,
  maxRank: 10,
  category: "temper-skill-line-category/guild",
} as const satisfies TemperSkillLine
