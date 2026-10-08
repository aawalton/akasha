import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDungeonsSelenesWeb = {
  id: "01a06168-7248-7012-86bc-4fd49a71d5f0",
  type: "page-type/temper-achievement-category",
  slug: "account-dungeons-selenes-web",
  title: "Selene's Web",
  category: "account",
  displayOrder: 17,
  parent: "temper-achievement-category/account-dungeons",
  achievements: "jsonl",
  createdAt: "2026-09-02T09:17:10.088Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperAchievementCategory
