import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountCharacterVampire = {
  id: "01a06168-7246-700c-8d05-e8a37c78d241",
  type: "page-type/temper-achievement-category",
  slug: "account-character-vampire",
  title: "Vampire",
  category: "account",
  displayOrder: 6,
  parent: "temper-achievement-category/account-character",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
