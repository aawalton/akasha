import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountNightMarketExploration = {
  id: "01a06168-724c-700e-a239-b6b1383859dc",
  type: "page-type/temper-achievement-category",
  slug: "account-night-market-exploration",
  title: "Exploration",
  category: "account",
  displayOrder: 2,
  parent: "temper-achievement-category/account-night-market",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
