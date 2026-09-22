import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountRecentSeasonsVeterancy = {
  id: "01a06168-7246-7002-a674-bbb49ba4aa91",
  type: "page-type/temper-achievement-category",
  slug: "account-recent-seasons-veterancy",
  title: "Veterancy",
  category: "account",
  displayOrder: 2,
  parent: "temper-achievement-category/account-recent-seasons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
