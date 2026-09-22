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
} as const satisfies TemperAchievementCategory
