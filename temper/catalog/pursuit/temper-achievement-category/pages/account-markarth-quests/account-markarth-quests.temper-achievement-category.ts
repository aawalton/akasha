import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountMarkarthQuests = {
  id: "01a06168-7250-700a-a406-26276f3254a6",
  type: "page-type/temper-achievement-category",
  slug: "account-markarth-quests",
  title: "Quests",
  category: "account",
  displayOrder: 3,
  parent: "temper-achievement-category/account-markarth",
  achievements: "jsonl",
  activity: "temper-activity-category/quests",
  createdAt: "2026-09-02T09:17:10.096Z",
  updatedAt: "2026-09-27T03:05:59.000Z",
} as const satisfies TemperAchievementCategory
