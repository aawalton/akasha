import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountClockworkCityExploration = {
  id: "01a06168-7250-7018-ac15-1d503ed64e81",
  type: "page-type/temper-achievement-category",
  slug: "account-clockwork-city-exploration",
  title: "Exploration",
  category: "account",
  displayOrder: 1,
  parent: "temper-achievement-category/account-clockwork-city",
  achievements: "jsonl",
  activity: "temper-activity-category/exploration",
  createdAt: "2026-09-02T09:17:10.096Z",
  updatedAt: "2026-09-27T03:05:59.000Z",
} as const satisfies TemperAchievementCategory
