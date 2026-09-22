import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountGoldRoadGeneral = {
  id: "01a06168-724d-7011-87ee-c1a6f64aec0d",
  type: "page-type/temper-achievement-category",
  slug: "account-gold-road-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "temper-achievement-category/account-gold-road",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
