import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountBlackwoodExploration = {
  id: "01a06168-724e-7013-80a1-c4b905845724",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-blackwood-exploration",
  title: "Exploration",
  category: "account",
  displayOrder: 2,
  parent: "account-blackwood",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
