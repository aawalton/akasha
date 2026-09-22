import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const wardenWintersEmbrace = {
  id: "019e61dc-f1b8-724b-a7c9-dc62d81bb641",
  type: "page-type/temper-skill-line",
  slug: "warden-winters-embrace",
  title: "Winter's Embrace",
  key: "warden-winters-embrace",
  displayOrder: 3,
  esoSkillLineId: 129,
  maxRank: 50,
  subcategoryId: "character-class",
  class: "temper-class/warden",
} as const satisfies TemperSkillLine
