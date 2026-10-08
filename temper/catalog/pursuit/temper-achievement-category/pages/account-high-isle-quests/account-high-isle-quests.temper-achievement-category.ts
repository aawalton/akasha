import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountHighIsleQuests = {
  id: "01a06168-724e-700b-8c2c-68873a2a93a4",
  type: "page-type/temper-achievement-category",
  slug: "account-high-isle-quests",
  title: "Quests",
  category: "account",
  displayOrder: 3,
  parent: "temper-achievement-category/account-high-isle",
  achievements: "jsonl",
  activity: "temper-activity-category/quests",
  createdAt: "2026-09-02T09:17:10.094Z",
  updatedAt: "2026-09-27T03:05:59.000Z",
} as const satisfies TemperAchievementCategory
