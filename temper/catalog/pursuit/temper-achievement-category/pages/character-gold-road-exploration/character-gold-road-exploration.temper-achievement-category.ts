import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const characterGoldRoadExploration = {
  id: "01a06168-7251-7016-bf6f-fed40e292ff7",
  type: "page-type/temper-achievement-category",
  slug: "character-gold-road-exploration",
  title: "Exploration",
  category: "character",
  displayOrder: 0,
  parent: "temper-achievement-category/character-gold-road",
  achievements: "jsonl",
  activity: "temper-activity-category/exploration",
  createdAt: "2026-09-02T09:17:10.097Z",
  updatedAt: "2026-09-27T03:05:59.000Z",
} as const satisfies TemperAchievementCategory
