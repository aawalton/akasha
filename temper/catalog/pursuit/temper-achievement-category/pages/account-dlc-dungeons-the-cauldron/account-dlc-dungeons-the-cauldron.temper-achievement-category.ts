import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDlcDungeonsTheCauldron = {
  id: "01a06168-724a-700d-a6a0-82d1a8756ca4",
  type: "page-type/temper-achievement-category",
  slug: "account-dlc-dungeons-the-cauldron",
  title: "The Cauldron",
  category: "account",
  displayOrder: 32,
  parent: "temper-achievement-category/account-dlc-dungeons",
  achievements: "jsonl",
  createdAt: "2026-09-02T09:17:10.090Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperAchievementCategory
