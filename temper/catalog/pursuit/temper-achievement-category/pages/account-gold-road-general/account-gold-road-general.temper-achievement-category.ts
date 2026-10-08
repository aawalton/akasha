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
  createdAt: "2026-09-02T09:17:10.093Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperAchievementCategory
