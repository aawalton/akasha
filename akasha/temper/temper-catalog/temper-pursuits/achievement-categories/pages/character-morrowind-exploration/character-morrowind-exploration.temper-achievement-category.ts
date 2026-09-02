import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const characterMorrowindExploration = {
  id: "01a06168-7252-7009-96a5-8fd4fa18bc5c",
  pageTypeSlug: "temper-achievement-category",
  slug: "character-morrowind-exploration",
  title: "Exploration",
  category: "character",
  displayOrder: 1,
  parent: "character-morrowind",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
