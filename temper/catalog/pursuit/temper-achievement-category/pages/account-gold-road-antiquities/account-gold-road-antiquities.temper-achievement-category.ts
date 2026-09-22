import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountGoldRoadAntiquities = {
  id: "01a06168-724d-7013-a61f-2774750f9d66",
  type: "page-type/temper-achievement-category",
  slug: "account-gold-road-antiquities",
  title: "Antiquities",
  category: "account",
  displayOrder: 2,
  parent: "temper-achievement-category/account-gold-road",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
