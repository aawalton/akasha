import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountHousingProperty = {
  id: "01a06168-724d-7000-996c-5b34d3c8431a",
  type: "page-type/temper-achievement-category",
  slug: "account-housing-property",
  title: "Property",
  category: "account",
  displayOrder: 1,
  parent: "temper-achievement-category/account-housing",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
