import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountImperialCityGeneral = {
  id: "01a06168-7251-700a-aab2-2c5c6a7f349a",
  type: "page-type/temper-achievement-category",
  slug: "account-imperial-city-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "temper-achievement-category/account-imperial-city",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
