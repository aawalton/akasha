import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDungeonsCryptOfHeartsIi = {
  id: "01a06168-7248-700a-83f4-fcb0279c7c5f",
  type: "page-type/temper-achievement-category",
  slug: "account-dungeons-crypt-of-hearts-ii",
  title: "Crypt of Hearts II",
  category: "account",
  displayOrder: 9,
  parent: "temper-achievement-category/account-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
