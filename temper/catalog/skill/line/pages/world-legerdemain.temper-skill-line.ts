import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const worldLegerdemain = {
  id: "019e61dc-f1d4-7909-9480-26e907fd4166",
  type: "page-type/temper-skill-line",
  slug: "world-legerdemain",
  title: "Legerdemain",
  key: "world-legerdemain",
  displayOrder: 32,
  esoSkillLineId: 111,
  maxRank: 20,
  category: "temper-skill-line-category/world",
} as const satisfies TemperSkillLine
