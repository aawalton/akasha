import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const characterDarkBrotherhood = {
  id: "01a06168-7252-7011-989d-42ac528c1274",
  type: "page-type/temper-achievement-category",
  slug: "character-dark-brotherhood",
  title: "Dark Brotherhood",
  category: "character",
  displayOrder: 16,
  activity: "temper-activity-category/quests",
  createdAt: "2026-09-02T09:17:10.098Z",
  updatedAt: "2026-09-27T03:05:59.000Z",
} as const satisfies TemperAchievementCategory
