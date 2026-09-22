import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const companionSharedMagesGuild = {
  id: "019e61dc-f1f5-7cbc-82d2-11acb2804b0a",
  type: "page-type/temper-skill-line",
  slug: "companion-shared-mages-guild",
  title: "Mages Guild",
  key: "companion-shared-mages-guild",
  displayOrder: 73,
  esoSkillLineId: 190,
  maxRank: 10,
  category: "temper-skill-line-category/companion",
} as const satisfies TemperSkillLine
