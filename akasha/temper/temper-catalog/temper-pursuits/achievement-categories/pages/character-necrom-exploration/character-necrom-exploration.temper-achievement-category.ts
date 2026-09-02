import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const characterNecromExploration = {
  id: "01a06168-7251-7018-93f5-cc11058311d7",
  pageTypeSlug: "temper-achievement-category",
  slug: "character-necrom-exploration",
  title: "Exploration",
  category: "character",
  displayOrder: 0,
  parent: "character-necrom",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
