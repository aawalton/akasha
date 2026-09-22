import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountRecentSeasonsDynamicEncounters = {
  id: "01a06168-7246-7004-891a-9ac49265eade",
  type: "page-type/temper-achievement-category",
  slug: "account-recent-seasons-dynamic-encounters",
  title: "Dynamic Encounters",
  category: "account",
  displayOrder: 4,
  parent: "temper-achievement-category/account-recent-seasons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
