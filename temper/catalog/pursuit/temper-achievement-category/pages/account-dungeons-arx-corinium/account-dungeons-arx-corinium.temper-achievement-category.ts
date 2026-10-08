import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDungeonsArxCorinium = {
  id: "01a06168-7248-7002-9c83-4f1e55303db6",
  type: "page-type/temper-achievement-category",
  slug: "account-dungeons-arx-corinium",
  title: "Arx Corinium",
  category: "account",
  displayOrder: 1,
  parent: "temper-achievement-category/account-dungeons",
  achievements: "jsonl",
  createdAt: "2026-09-02T09:17:10.088Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperAchievementCategory
