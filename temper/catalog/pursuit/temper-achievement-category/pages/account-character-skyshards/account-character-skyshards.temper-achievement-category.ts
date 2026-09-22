import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountCharacterSkyshards = {
  id: "01a06168-7246-700a-939b-9b598b83460e",
  type: "page-type/temper-achievement-category",
  slug: "account-character-skyshards",
  title: "Skyshards",
  category: "account",
  displayOrder: 4,
  parent: "temper-achievement-category/account-character",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
