import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountCharacterCompanions = {
  id: "01a06168-7246-700e-b83a-765047355090",
  type: "page-type/temper-achievement-category",
  slug: "account-character-companions",
  title: "Companions",
  category: "account",
  displayOrder: 8,
  parent: "temper-achievement-category/account-character",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
