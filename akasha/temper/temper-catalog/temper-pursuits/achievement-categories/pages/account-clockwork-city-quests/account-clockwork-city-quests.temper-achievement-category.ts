import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountClockworkCityQuests = {
  id: "01a06168-7250-7019-a3fa-315d07646310",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-clockwork-city-quests",
  title: "Quests",
  category: "account",
  displayOrder: 2,
  parent: "account-clockwork-city",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
