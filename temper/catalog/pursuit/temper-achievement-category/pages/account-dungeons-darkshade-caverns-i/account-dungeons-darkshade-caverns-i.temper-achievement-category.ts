import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDungeonsDarkshadeCavernsI = {
  id: "01a06168-7248-700b-9c44-45a7afd81d1d",
  type: "page-type/temper-achievement-category",
  slug: "account-dungeons-darkshade-caverns-i",
  title: "Darkshade Caverns I",
  category: "account",
  displayOrder: 10,
  parent: "temper-achievement-category/account-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
