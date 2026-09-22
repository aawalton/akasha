import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const guildMagesGuild = {
  id: "019e61dc-f1c9-7484-8149-b09e589efca9",
  type: "page-type/temper-skill-line",
  slug: "guild-mages-guild",
  title: "Mages Guild",
  key: "guild-mages-guild",
  displayOrder: 39,
  esoSkillLineId: 44,
  maxRank: 10,
  category: "temper-skill-line-category/guild",
} as const satisfies TemperSkillLine
