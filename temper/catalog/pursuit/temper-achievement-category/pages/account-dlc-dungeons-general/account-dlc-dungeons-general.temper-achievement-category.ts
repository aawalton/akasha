import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDlcDungeonsGeneral = {
  id: "01a06168-7249-7004-b9b3-5019deca5518",
  type: "page-type/temper-achievement-category",
  slug: "account-dlc-dungeons-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "temper-achievement-category/account-dlc-dungeons",
  achievements: "jsonl",
  createdAt: "2026-09-02T09:17:10.089Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperAchievementCategory
