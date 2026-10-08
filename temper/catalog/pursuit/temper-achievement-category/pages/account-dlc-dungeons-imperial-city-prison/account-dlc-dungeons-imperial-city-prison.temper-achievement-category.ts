import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDlcDungeonsImperialCityPrison = {
  id: "01a06168-7249-7016-bb1d-c8638c124de4",
  type: "page-type/temper-achievement-category",
  slug: "account-dlc-dungeons-imperial-city-prison",
  title: "Imperial City Prison",
  category: "account",
  displayOrder: 18,
  parent: "temper-achievement-category/account-dlc-dungeons",
  achievements: "jsonl",
  activity: "temper-activity-category/group-dungeons",
  createdAt: "2026-09-02T09:17:10.089Z",
  updatedAt: "2026-09-27T03:05:59.000Z",
} as const satisfies TemperAchievementCategory
