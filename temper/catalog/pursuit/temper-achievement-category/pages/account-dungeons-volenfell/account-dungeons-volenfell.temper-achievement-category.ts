import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDungeonsVolenfell = {
  id: "01a06168-7248-7016-a6a5-2201d6441d47",
  type: "page-type/temper-achievement-category",
  slug: "account-dungeons-volenfell",
  title: "Volenfell",
  category: "account",
  displayOrder: 21,
  parent: "temper-achievement-category/account-dungeons",
  achievements: "jsonl",
  createdAt: "2026-09-02T09:17:10.088Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperAchievementCategory
