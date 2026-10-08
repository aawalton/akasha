import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const characterOrsiniumExploration = {
  id: "01a06168-7252-7017-8378-7a451639fb00",
  type: "page-type/temper-achievement-category",
  slug: "character-orsinium-exploration",
  title: "Exploration",
  category: "character",
  displayOrder: 1,
  parent: "temper-achievement-category/character-orsinium",
  achievements: "jsonl",
  activity: "temper-activity-category/exploration",
  createdAt: "2026-09-02T09:17:10.098Z",
  updatedAt: "2026-09-27T03:05:59.000Z",
} as const satisfies TemperAchievementCategory
