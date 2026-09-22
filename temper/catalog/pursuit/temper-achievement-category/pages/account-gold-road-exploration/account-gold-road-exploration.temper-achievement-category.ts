import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountGoldRoadExploration = {
  id: "01a06168-724d-7014-aec3-148673ff5ee0",
  type: "page-type/temper-achievement-category",
  slug: "account-gold-road-exploration",
  title: "Exploration",
  category: "account",
  displayOrder: 3,
  parent: "temper-achievement-category/account-gold-road",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
