import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDungeonsCityOfAshIi = {
  id: "01a06168-7248-7008-aad5-11f79794c10b",
  type: "page-type/temper-achievement-category",
  slug: "account-dungeons-city-of-ash-ii",
  title: "City of Ash II",
  category: "account",
  displayOrder: 7,
  parent: "temper-achievement-category/account-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
