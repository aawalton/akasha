import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountCharacterChampion = {
  id: "01a06168-7246-7008-a6fc-d55567bcd2ef",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-character-champion",
  title: "Champion",
  category: "account",
  displayOrder: 2,
  parent: "account-character",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
