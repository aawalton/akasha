import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountExplorationCraglorn = {
  id: "01a06168-724b-7014-b7d4-cea221c08f67",
  type: "page-type/temper-achievement-category",
  slug: "account-exploration-craglorn",
  title: "Craglorn",
  category: "account",
  displayOrder: 5,
  parent: "temper-achievement-category/account-exploration",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
