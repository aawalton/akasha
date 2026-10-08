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
  createdAt: "2026-09-02T09:17:10.093Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperAchievementCategory
