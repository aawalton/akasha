import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountSummersetQuests = {
  id: "01a06168-724f-700c-a90f-e655a5834de9",
  type: "page-type/temper-achievement-category",
  slug: "account-summerset-quests",
  title: "Quests",
  category: "account",
  displayOrder: 2,
  parent: "temper-achievement-category/account-summerset",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
