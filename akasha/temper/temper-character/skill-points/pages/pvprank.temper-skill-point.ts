import type { TemperSkillPoint } from "../temper-skill-point.page-type.ts"

export const pvprank = {
  id: "01a05fd0-d561-74d7-8044-337a700d803b",
  pageTypeSlug: "temper-skill-point",
  slug: "pvprank",
  title: "PvP Rank",
  key: "pvpRank",
  category: "general",
  maxValue: 50,
} as const satisfies TemperSkillPoint
