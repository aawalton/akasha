import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountGreymoorExploration = {
  id: "01a06168-724f-7000-93f6-cfbb75add549",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-greymoor-exploration",
  title: "Exploration",
  category: "account",
  displayOrder: 2,
  parent: "account-greymoor",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
