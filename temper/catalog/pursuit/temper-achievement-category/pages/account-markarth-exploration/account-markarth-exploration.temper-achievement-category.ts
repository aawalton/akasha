import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountMarkarthExploration = {
  id: "01a06168-7250-7008-a776-ffbbf94c7563",
  type: "page-type/temper-achievement-category",
  slug: "account-markarth-exploration",
  title: "Exploration",
  category: "account",
  displayOrder: 1,
  parent: "temper-achievement-category/account-markarth",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
