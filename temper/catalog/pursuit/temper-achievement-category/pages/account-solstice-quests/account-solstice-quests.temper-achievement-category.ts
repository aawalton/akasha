import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountSolsticeQuests = {
  id: "01a06168-724d-700e-a59d-4c51a61d2e0e",
  type: "page-type/temper-achievement-category",
  slug: "account-solstice-quests",
  title: "Quests",
  category: "account",
  displayOrder: 4,
  parent: "temper-achievement-category/account-solstice",
  achievements: "jsonl",
  activity: "temper-activity-category/quests",
  createdAt: "2026-09-02T09:17:10.093Z",
  updatedAt: "2026-09-27T03:05:59.000Z",
} as const satisfies TemperAchievementCategory
