import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountSolsticeExploration = {
  id: "01a06168-724d-700c-9daa-dd025c425d33",
  type: "page-type/temper-achievement-category",
  slug: "account-solstice-exploration",
  title: "Exploration",
  category: "account",
  displayOrder: 2,
  parent: "temper-achievement-category/account-solstice",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
