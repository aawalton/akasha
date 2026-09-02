import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountGoldRoadQuests = {
  id: "01a06168-724d-7016-b1c5-2a5e4b94f8a7",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-gold-road-quests",
  title: "Quests",
  category: "account",
  displayOrder: 5,
  parent: "account-gold-road",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
