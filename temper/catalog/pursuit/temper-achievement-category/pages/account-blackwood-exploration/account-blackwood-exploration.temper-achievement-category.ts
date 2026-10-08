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
  activity: "temper-activity-category/exploration",
  createdAt: "2026-09-02T09:17:10.094Z",
  updatedAt: "2026-09-27T03:05:59.000Z",
} as const satisfies TemperAchievementCategory
