import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const nightbladeAssassination = {
  id: "019e61dc-f1af-73c9-8210-94ea9faf29f0",
  type: "page-type/temper-skill-line",
  slug: "nightblade-assassination",
  title: "Assassination",
  key: "nightblade-assassination",
  displayOrder: 10,
  esoSkillLineId: 38,
  maxRank: 50,
  category: "temper-skill-line-category/character-class",
  class: "temper-class/nightblade",
} as const satisfies TemperSkillLine
