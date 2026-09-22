import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDungeonsDarkshadeCavernsIi = {
  id: "01a06168-7248-700c-9bfc-47ee8e2ff0d6",
  type: "page-type/temper-achievement-category",
  slug: "account-dungeons-darkshade-caverns-ii",
  title: "Darkshade Caverns II",
  category: "account",
  displayOrder: 11,
  parent: "temper-achievement-category/account-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
