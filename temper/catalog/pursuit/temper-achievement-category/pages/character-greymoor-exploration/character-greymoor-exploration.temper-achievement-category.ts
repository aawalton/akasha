import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const characterGreymoorExploration = {
  id: "01a06168-7252-7000-8293-a89e3ca0866b",
  type: "page-type/temper-achievement-category",
  slug: "character-greymoor-exploration",
  title: "Exploration",
  category: "character",
  displayOrder: 1,
  parent: "temper-achievement-category/character-greymoor",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
