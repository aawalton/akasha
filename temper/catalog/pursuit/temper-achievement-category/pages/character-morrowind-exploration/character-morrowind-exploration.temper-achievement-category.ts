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
  activity: "temper-activity-category/exploration",
  createdAt: "2026-09-02T09:17:10.098Z",
  updatedAt: "2026-09-27T03:05:59.000Z",
} as const satisfies TemperAchievementCategory
