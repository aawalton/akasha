import type { TemperSkillPoint } from "../temper-skill-point.page-type.ts"

export const ws = {
  id: "01a05fd0-d564-7caf-99f0-19b6402d994a",
  pageTypeSlug: "temper-skill-point",
  slug: "ws",
  title: "Western Skyrim",
  key: "WS",
  category: "zone",
  maxQuests: 3,
  maxSkyshards: 18,
} as const satisfies TemperSkillPoint
