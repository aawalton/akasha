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
} as const satisfies TemperAchievementCategory
