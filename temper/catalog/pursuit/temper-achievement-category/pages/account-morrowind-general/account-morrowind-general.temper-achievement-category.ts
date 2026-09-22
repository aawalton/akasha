import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountMorrowindGeneral = {
  id: "01a06168-724f-700f-ac03-3aeebeff385c",
  type: "page-type/temper-achievement-category",
  slug: "account-morrowind-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "temper-achievement-category/account-morrowind",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
