import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountDeadlandsGeneral = {
  id: "01a06168-7250-7001-9355-8c8b806292d4",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-deadlands-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "account-deadlands",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
