import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountExplorationGeneral = {
  id: "01a06168-724b-700f-ab31-a4f89cfab2ba",
  type: "page-type/temper-achievement-category",
  slug: "account-exploration-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "temper-achievement-category/account-exploration",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
