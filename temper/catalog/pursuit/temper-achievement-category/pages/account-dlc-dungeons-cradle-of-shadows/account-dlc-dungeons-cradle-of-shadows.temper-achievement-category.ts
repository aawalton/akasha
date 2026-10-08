import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDlcDungeonsCradleOfShadows = {
  id: "01a06168-7249-700c-9a30-39e9cf6a4b1b",
  type: "page-type/temper-achievement-category",
  slug: "account-dlc-dungeons-cradle-of-shadows",
  title: "Cradle of Shadows",
  category: "account",
  displayOrder: 8,
  parent: "temper-achievement-category/account-dlc-dungeons",
  achievements: "jsonl",
  createdAt: "2026-09-02T09:17:10.089Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperAchievementCategory
