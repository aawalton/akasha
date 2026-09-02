import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountRecentSeasonsGeneral = {
  id: "01a06168-7246-7000-b4f7-5e67f2eaac6b",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-recent-seasons-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "account-recent-seasons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
