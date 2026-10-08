import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountExplorationPublicDungeons = {
  id: "01a06168-724c-7001-bdd8-2291e71a23a3",
  type: "page-type/temper-achievement-category",
  slug: "account-exploration-public-dungeons",
  title: "Public Dungeons",
  category: "account",
  displayOrder: 9,
  parent: "temper-achievement-category/account-exploration",
  achievements: "jsonl",
  activity: "temper-activity-category/exploration",
  createdAt: "2026-09-02T09:17:10.092Z",
  updatedAt: "2026-09-27T03:05:59.000Z",
} as const satisfies TemperAchievementCategory
