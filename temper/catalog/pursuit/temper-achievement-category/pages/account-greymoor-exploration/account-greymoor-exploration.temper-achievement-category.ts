import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountGreymoorExploration = {
  id: "01a06168-724f-7000-93f6-cfbb75add549",
  type: "page-type/temper-achievement-category",
  slug: "account-greymoor-exploration",
  title: "Exploration",
  category: "account",
  displayOrder: 2,
  parent: "temper-achievement-category/account-greymoor",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
