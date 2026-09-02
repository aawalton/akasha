import type { TemperSkillPoint } from "../temper-skill-point.page-type.ts"

export const ap = {
  id: "01a05fd0-d552-777a-8571-f19dfa1bc74c",
  pageTypeSlug: "temper-skill-point",
  slug: "ap",
  title: "Apocrypha",
  key: "AP",
  category: "zone",
  maxQuests: 9,
  maxSkyshards: 18,
} as const satisfies TemperSkillPoint
