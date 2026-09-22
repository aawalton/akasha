import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const vengeanceNightbladeAssassination = {
  id: "019e6f53-86ae-7369-9937-5556b3cdbd1f",
  type: "page-type/temper-skill-line",
  slug: "vengeance-nightblade-assassination",
  title: "Vengeance Assassination",
  key: "vengeance-nightblade-assassination",
  displayOrder: 110,
  esoSkillLineId: 300,
  maxRank: 0,
  category: "temper-skill-line-category/alliance-war",
} as const satisfies TemperSkillLine
