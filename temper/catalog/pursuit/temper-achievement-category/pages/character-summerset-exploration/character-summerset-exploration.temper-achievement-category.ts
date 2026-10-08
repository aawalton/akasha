import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const characterSummersetExploration = {
  id: "01a06168-7252-7006-92d4-1791f84d6c70",
  type: "page-type/temper-achievement-category",
  slug: "character-summerset-exploration",
  title: "Exploration",
  category: "character",
  displayOrder: 1,
  parent: "temper-achievement-category/character-summerset",
  achievements: "jsonl",
  activity: "temper-activity-category/exploration",
  createdAt: "2026-09-02T09:17:10.098Z",
  updatedAt: "2026-09-27T03:05:59.000Z",
} as const satisfies TemperAchievementCategory
