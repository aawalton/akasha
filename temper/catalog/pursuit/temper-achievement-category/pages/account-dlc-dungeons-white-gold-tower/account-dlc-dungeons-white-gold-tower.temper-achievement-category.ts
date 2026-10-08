import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDlcDungeonsWhiteGoldTower = {
  id: "01a06168-724a-700f-91cc-ad55abbd9648",
  type: "page-type/temper-achievement-category",
  slug: "account-dlc-dungeons-white-gold-tower",
  title: "White Gold Tower",
  category: "account",
  displayOrder: 34,
  parent: "temper-achievement-category/account-dlc-dungeons",
  achievements: "jsonl",
  activity: "temper-activity-category/group-dungeons",
  createdAt: "2026-09-02T09:17:10.090Z",
  updatedAt: "2026-09-27T03:05:59.000Z",
} as const satisfies TemperAchievementCategory
