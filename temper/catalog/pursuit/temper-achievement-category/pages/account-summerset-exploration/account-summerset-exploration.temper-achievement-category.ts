import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountSummersetExploration = {
  id: "01a06168-724f-700b-bf35-71a8920ead56",
  type: "page-type/temper-achievement-category",
  slug: "account-summerset-exploration",
  title: "Exploration",
  category: "account",
  displayOrder: 1,
  parent: "temper-achievement-category/account-summerset",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
