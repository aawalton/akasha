import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDeadlandsExploration = {
  id: "01a06168-7250-7002-9a6c-df8f2a3623e4",
  type: "page-type/temper-achievement-category",
  slug: "account-deadlands-exploration",
  title: "Exploration",
  category: "account",
  displayOrder: 1,
  parent: "temper-achievement-category/account-deadlands",
  achievements: "jsonl",
  activity: "temper-activity-category/exploration",
  createdAt: "2026-09-02T09:17:10.096Z",
  updatedAt: "2026-09-27T03:05:59.000Z",
} as const satisfies TemperAchievementCategory
