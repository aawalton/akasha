import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountDeadlandsExploration = {
  id: "01a06168-7250-7002-9a6c-df8f2a3623e4",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-deadlands-exploration",
  title: "Exploration",
  category: "account",
  displayOrder: 1,
  parent: "account-deadlands",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
