import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const characterMorrowind = {
  id: "01a06168-7252-7007-b1a6-5387957ccd42",
  type: "page-type/temper-achievement-category",
  slug: "character-morrowind",
  title: "Morrowind",
  category: "character",
  displayOrder: 12,
  activity: "temper-activity-category/exploration",
  createdAt: "2026-09-02T09:17:10.098Z",
  updatedAt: "2026-09-27T03:05:59.000Z",
} as const satisfies TemperAchievementCategory
