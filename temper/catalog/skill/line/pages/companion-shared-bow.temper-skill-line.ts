import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const companionSharedBow = {
  id: "019e61dc-f1ed-7126-9cc6-5eb5cb1106b1",
  type: "page-type/temper-skill-line",
  slug: "companion-shared-bow",
  title: "Bow",
  key: "companion-shared-bow",
  displayOrder: 66,
  esoSkillLineId: 183,
  maxRank: 20,
  category: "temper-skill-line-category/companion",
} as const satisfies TemperSkillLine
