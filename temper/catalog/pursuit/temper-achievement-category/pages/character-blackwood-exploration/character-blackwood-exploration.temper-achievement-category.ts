import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const characterBlackwoodExploration = {
  id: "01a06168-7251-701c-b6d9-f8a3e4febd80",
  type: "page-type/temper-achievement-category",
  slug: "character-blackwood-exploration",
  title: "Exploration",
  category: "character",
  displayOrder: 0,
  parent: "temper-achievement-category/character-blackwood",
  achievements: "jsonl",
  activity: "temper-activity-category/exploration",
  createdAt: "2026-09-02T09:17:10.097Z",
  updatedAt: "2026-09-27T03:05:59.000Z",
} as const satisfies TemperAchievementCategory
