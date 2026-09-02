import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const characterBlackwoodExploration = {
  id: "01a06168-7251-701c-b6d9-f8a3e4febd80",
  pageTypeSlug: "temper-achievement-category",
  slug: "character-blackwood-exploration",
  title: "Exploration",
  category: "character",
  displayOrder: 0,
  parent: "character-blackwood",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
