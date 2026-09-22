import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDlcDungeonsBlackDrakeVilla = {
  id: "01a06168-7249-7007-9d0e-a1bca6af0360",
  type: "page-type/temper-achievement-category",
  slug: "account-dlc-dungeons-black-drake-villa",
  title: "Black Drake Villa",
  category: "account",
  displayOrder: 3,
  parent: "temper-achievement-category/account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
