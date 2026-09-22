import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountCharacterClass = {
  id: "01a06168-7247-7000-8ad3-312b6a6c7669",
  type: "page-type/temper-achievement-category",
  slug: "account-character-class",
  title: "Class",
  category: "account",
  displayOrder: 9,
  parent: "temper-achievement-category/account-character",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
