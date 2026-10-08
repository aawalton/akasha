import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountGreymoorQuests = {
  id: "01a06168-724f-7002-884f-83e239459141",
  type: "page-type/temper-achievement-category",
  slug: "account-greymoor-quests",
  title: "Quests",
  category: "account",
  displayOrder: 4,
  parent: "temper-achievement-category/account-greymoor",
  achievements: "jsonl",
  activity: "temper-activity-category/quests",
  createdAt: "2026-09-02T09:17:10.095Z",
  updatedAt: "2026-09-27T03:05:59.000Z",
} as const satisfies TemperAchievementCategory
