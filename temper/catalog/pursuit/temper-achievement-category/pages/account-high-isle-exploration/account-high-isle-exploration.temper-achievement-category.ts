import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountHighIsleExploration = {
  id: "01a06168-724e-700d-91c1-e755af09c447",
  type: "page-type/temper-achievement-category",
  slug: "account-high-isle-exploration",
  title: "Exploration",
  category: "account",
  displayOrder: 5,
  parent: "temper-achievement-category/account-high-isle",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
