import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountGreymoorExploration = {
  id: "01a06168-724f-7000-93f6-cfbb75add549",
  type: "page-type/temper-achievement-category",
  slug: "account-greymoor-exploration",
  title: "Exploration",
  category: "account",
  displayOrder: 2,
  parent: "temper-achievement-category/account-greymoor",
  achievements: "jsonl",
  activity: "temper-activity-category/exploration",
  createdAt: "2026-09-02T09:17:10.095Z",
  updatedAt: "2026-09-27T03:05:59.000Z",
} as const satisfies TemperAchievementCategory
