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
  activity: "temper-activity-category/quests",
  createdAt: "2026-09-02T09:17:10.098Z",
  updatedAt: "2026-09-27T03:05:59.000Z",
} as const satisfies TemperAchievementCategory
