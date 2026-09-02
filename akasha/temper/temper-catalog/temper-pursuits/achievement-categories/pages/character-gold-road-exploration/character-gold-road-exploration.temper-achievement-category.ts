import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const characterGoldRoadExploration = {
  id: "01a06168-7251-7016-bf6f-fed40e292ff7",
  pageTypeSlug: "temper-achievement-category",
  slug: "character-gold-road-exploration",
  title: "Exploration",
  category: "character",
  displayOrder: 0,
  parent: "character-gold-road",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
