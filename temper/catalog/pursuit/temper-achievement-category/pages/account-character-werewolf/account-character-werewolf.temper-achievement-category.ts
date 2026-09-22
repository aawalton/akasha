import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountCharacterWerewolf = {
  id: "01a06168-7246-700d-81bb-e800fd1070c3",
  type: "page-type/temper-achievement-category",
  slug: "account-character-werewolf",
  title: "Werewolf",
  category: "account",
  displayOrder: 7,
  parent: "temper-achievement-category/account-character",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
