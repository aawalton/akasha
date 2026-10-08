import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountQuests = {
  id: "01a06168-724c-7002-9d04-3c0669dfeff1",
  type: "page-type/temper-achievement-category",
  slug: "account-quests",
  title: "Quests",
  category: "account",
  displayOrder: 9,
  activity: "temper-activity-category/quests",
  createdAt: "2026-09-02T09:17:10.092Z",
  updatedAt: "2026-09-27T03:05:59.000Z",
} as const satisfies TemperAchievementCategory
