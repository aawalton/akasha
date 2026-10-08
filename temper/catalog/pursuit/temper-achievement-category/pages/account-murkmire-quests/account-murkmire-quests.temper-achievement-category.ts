import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountMurkmireQuests = {
  id: "01a06168-7250-7015-8442-cfaece98a136",
  type: "page-type/temper-achievement-category",
  slug: "account-murkmire-quests",
  title: "Quests",
  category: "account",
  displayOrder: 3,
  parent: "temper-achievement-category/account-murkmire",
  achievements: "jsonl",
  activity: "temper-activity-category/quests",
  createdAt: "2026-09-02T09:17:10.096Z",
  updatedAt: "2026-09-27T03:05:59.000Z",
} as const satisfies TemperAchievementCategory
