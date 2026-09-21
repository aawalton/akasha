import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const characterGoldRoad = {
  id: "01a06168-7251-7015-8ab2-05d8e58d6086",
  type: "page-type/temper-achievement-category",
  slug: "character-gold-road",
  title: "Gold Road",
  category: "character",
  displayOrder: 5,
} as const satisfies TemperAchievementCategory
