import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountCharacterTrophies = {
  id: "01a06168-7246-700b-b22f-8b7adcb6a2ef",
  type: "page-type/temper-achievement-category",
  slug: "account-character-trophies",
  title: "Trophies",
  category: "account",
  displayOrder: 5,
  parent: "temper-achievement-category/account-character",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
