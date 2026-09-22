import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountRecentSeasonsQuests = {
  id: "01a06168-7246-7003-83fb-23b95d1546d6",
  type: "page-type/temper-achievement-category",
  slug: "account-recent-seasons-quests",
  title: "Quests",
  category: "account",
  displayOrder: 3,
  parent: "temper-achievement-category/account-recent-seasons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
