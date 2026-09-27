import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const characterHighIsle = {
  id: "01a06168-7251-7019-b474-e843dd31d36b",
  type: "page-type/temper-achievement-category",
  slug: "character-high-isle",
  title: "High Isle",
  category: "character",
  displayOrder: 7,
  activity: "temper-activity-category/exploration",
} as const satisfies TemperAchievementCategory
