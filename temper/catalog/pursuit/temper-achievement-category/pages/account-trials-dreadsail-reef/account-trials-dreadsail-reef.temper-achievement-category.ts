import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountTrialsDreadsailReef = {
  id: "01a06168-724a-7015-a8df-dff169d2486c",
  type: "page-type/temper-achievement-category",
  slug: "account-trials-dreadsail-reef",
  title: "Dreadsail Reef",
  category: "account",
  displayOrder: 4,
  parent: "temper-achievement-category/account-trials",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
