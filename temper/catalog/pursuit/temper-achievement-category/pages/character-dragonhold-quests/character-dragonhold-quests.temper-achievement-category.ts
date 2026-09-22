import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const characterDragonholdQuests = {
  id: "01a06168-7252-700c-8850-4f9e60392dd0",
  type: "page-type/temper-achievement-category",
  slug: "character-dragonhold-quests",
  title: "Quests",
  category: "character",
  displayOrder: 1,
  parent: "temper-achievement-category/character-dragonhold",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
