import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountBlackwoodExploration = {
  id: "01a06168-724e-7013-80a1-c4b905845724",
  type: "page-type/temper-achievement-category",
  slug: "account-blackwood-exploration",
  title: "Exploration",
  category: "account",
  displayOrder: 2,
  parent: "temper-achievement-category/account-blackwood",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
