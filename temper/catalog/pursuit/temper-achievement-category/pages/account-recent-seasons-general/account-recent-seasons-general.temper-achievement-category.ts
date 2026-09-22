import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountRecentSeasonsGeneral = {
  id: "01a06168-7246-7000-b4f7-5e67f2eaac6b",
  type: "page-type/temper-achievement-category",
  slug: "account-recent-seasons-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "temper-achievement-category/account-recent-seasons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
