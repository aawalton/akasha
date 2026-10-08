import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDungeonsBlackheartHaven = {
  id: "01a06168-7248-7005-a77e-c50341992187",
  type: "page-type/temper-achievement-category",
  slug: "account-dungeons-blackheart-haven",
  title: "Blackheart Haven",
  category: "account",
  displayOrder: 4,
  parent: "temper-achievement-category/account-dungeons",
  achievements: "jsonl",
  createdAt: "2026-09-02T09:17:10.088Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperAchievementCategory
