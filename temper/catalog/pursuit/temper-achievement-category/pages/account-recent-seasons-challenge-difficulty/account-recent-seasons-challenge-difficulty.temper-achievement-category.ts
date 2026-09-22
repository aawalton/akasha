import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountRecentSeasonsChallengeDifficulty = {
  id: "01a06168-7246-7001-b822-e2ce3fb5245a",
  type: "page-type/temper-achievement-category",
  slug: "account-recent-seasons-challenge-difficulty",
  title: "Challenge Difficulty",
  category: "account",
  displayOrder: 1,
  parent: "temper-achievement-category/account-recent-seasons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
