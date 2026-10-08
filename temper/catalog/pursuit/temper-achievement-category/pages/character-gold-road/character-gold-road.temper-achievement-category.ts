import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const characterGoldRoad = {
  id: "01a06168-7251-7015-8ab2-05d8e58d6086",
  type: "page-type/temper-achievement-category",
  slug: "character-gold-road",
  title: "Gold Road",
  category: "character",
  displayOrder: 5,
  activity: "temper-activity-category/exploration",
  createdAt: "2026-09-02T09:17:10.097Z",
  updatedAt: "2026-09-27T03:05:59.000Z",
} as const satisfies TemperAchievementCategory
