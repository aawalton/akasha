import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountOrsiniumQuests = {
  id: "01a06168-7251-7008-b5f8-491f79e50f9d",
  type: "page-type/temper-achievement-category",
  slug: "account-orsinium-quests",
  title: "Quests",
  category: "account",
  displayOrder: 2,
  parent: "temper-achievement-category/account-orsinium",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
