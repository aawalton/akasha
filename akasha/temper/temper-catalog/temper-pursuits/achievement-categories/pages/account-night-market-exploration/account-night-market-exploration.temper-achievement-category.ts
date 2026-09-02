import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountNightMarketExploration = {
  id: "01a06168-724c-700e-a239-b6b1383859dc",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-night-market-exploration",
  title: "Exploration",
  category: "account",
  displayOrder: 2,
  parent: "account-night-market",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
