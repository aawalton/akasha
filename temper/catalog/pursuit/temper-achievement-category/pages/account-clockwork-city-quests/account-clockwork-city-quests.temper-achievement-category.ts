import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountClockworkCityQuests = {
  id: "01a06168-7250-7019-a3fa-315d07646310",
  type: "page-type/temper-achievement-category",
  slug: "account-clockwork-city-quests",
  title: "Quests",
  category: "account",
  displayOrder: 2,
  parent: "temper-achievement-category/account-clockwork-city",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
