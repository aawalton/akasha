import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDlcDungeonsMoongraveFane = {
  id: "01a06168-724a-7004-b282-2ff70d1c7a47",
  type: "page-type/temper-achievement-category",
  slug: "account-dlc-dungeons-moongrave-fane",
  title: "Moongrave Fane",
  category: "account",
  displayOrder: 23,
  parent: "temper-achievement-category/account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
