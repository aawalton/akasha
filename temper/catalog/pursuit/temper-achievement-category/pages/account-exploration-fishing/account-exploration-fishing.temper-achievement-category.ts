import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountExplorationFishing = {
  id: "01a06168-724c-7000-8ed3-816eafc4372b",
  type: "page-type/temper-achievement-category",
  slug: "account-exploration-fishing",
  title: "Fishing",
  category: "account",
  displayOrder: 8,
  parent: "temper-achievement-category/account-exploration",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
