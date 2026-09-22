import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDungeonsCryptOfHeartsI = {
  id: "01a06168-7248-7009-972c-b2a69f278386",
  type: "page-type/temper-achievement-category",
  slug: "account-dungeons-crypt-of-hearts-i",
  title: "Crypt of Hearts I",
  category: "account",
  displayOrder: 8,
  parent: "temper-achievement-category/account-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
