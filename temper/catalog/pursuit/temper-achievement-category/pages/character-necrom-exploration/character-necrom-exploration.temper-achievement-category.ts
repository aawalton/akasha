import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const characterNecromExploration = {
  id: "01a06168-7251-7018-93f5-cc11058311d7",
  type: "page-type/temper-achievement-category",
  slug: "character-necrom-exploration",
  title: "Exploration",
  category: "character",
  displayOrder: 0,
  parent: "temper-achievement-category/character-necrom",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
