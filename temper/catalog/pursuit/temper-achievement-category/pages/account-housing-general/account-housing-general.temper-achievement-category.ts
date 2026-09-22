import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountHousingGeneral = {
  id: "01a06168-724c-7015-86a6-a9ad9ee6cdf8",
  type: "page-type/temper-achievement-category",
  slug: "account-housing-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "temper-achievement-category/account-housing",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
