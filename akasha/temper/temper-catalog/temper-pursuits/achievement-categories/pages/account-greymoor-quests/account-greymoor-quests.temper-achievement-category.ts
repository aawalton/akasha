import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountGreymoorQuests = {
  id: "01a06168-724f-7002-884f-83e239459141",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-greymoor-quests",
  title: "Quests",
  category: "account",
  displayOrder: 4,
  parent: "account-greymoor",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
