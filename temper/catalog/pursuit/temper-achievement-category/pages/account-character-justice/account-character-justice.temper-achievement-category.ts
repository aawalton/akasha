import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountCharacterJustice = {
  id: "01a06168-7246-7009-a316-15b98511838f",
  type: "page-type/temper-achievement-category",
  slug: "account-character-justice",
  title: "Justice",
  category: "account",
  displayOrder: 3,
  parent: "temper-achievement-category/account-character",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
