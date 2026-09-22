import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountElsweyrQuests = {
  id: "01a06168-724f-7008-b3f0-8895e0511114",
  type: "page-type/temper-achievement-category",
  slug: "account-elsweyr-quests",
  title: "Quests",
  category: "account",
  displayOrder: 3,
  parent: "temper-achievement-category/account-elsweyr",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
