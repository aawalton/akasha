import type { TemperSkillPoint } from "../temper-skill-point.page-type.ts"

export const mainquests = {
  id: "01a05fd0-d55f-718a-95ac-52238a140fae",
  pageTypeSlug: "temper-skill-point",
  slug: "mainquests",
  title: "Main Quests",
  key: "mainQuests",
  category: "general",
  maxValue: 11,
} as const satisfies TemperSkillPoint
