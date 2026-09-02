import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountGoldRoadAntiquities = {
  id: "01a06168-724d-7013-a61f-2774750f9d66",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-gold-road-antiquities",
  title: "Antiquities",
  category: "account",
  displayOrder: 2,
  parent: "account-gold-road",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
