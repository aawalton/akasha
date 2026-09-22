import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountSummersetGeneral = {
  id: "01a06168-724f-700a-8c51-98c5f9a609f6",
  type: "page-type/temper-achievement-category",
  slug: "account-summerset-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "temper-achievement-category/account-summerset",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
