import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const characterMorrowindExploration = {
  id: "01a06168-7252-7009-96a5-8fd4fa18bc5c",
  type: "page-type/temper-achievement-category",
  slug: "character-morrowind-exploration",
  title: "Exploration",
  category: "character",
  displayOrder: 1,
  parent: "temper-achievement-category/character-morrowind",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
