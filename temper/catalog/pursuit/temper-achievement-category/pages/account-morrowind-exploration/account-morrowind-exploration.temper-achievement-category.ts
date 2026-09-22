import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountMorrowindExploration = {
  id: "01a06168-724f-7010-a85c-97e44501aa54",
  type: "page-type/temper-achievement-category",
  slug: "account-morrowind-exploration",
  title: "Exploration",
  category: "account",
  displayOrder: 1,
  parent: "temper-achievement-category/account-morrowind",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
