import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const characterArenasMaelstromArena = {
  id: "01a06168-7251-700e-aa20-645a8e0cfbac",
  type: "page-type/temper-achievement-category",
  slug: "character-arenas-maelstrom-arena",
  title: "Maelstrom Arena",
  category: "character",
  displayOrder: 0,
  parent: "temper-achievement-category/character-arenas",
  achievements: "jsonl",
  activity: "temper-activity-category/arenas",
  createdAt: "2026-09-02T09:17:10.097Z",
  updatedAt: "2026-09-27T03:05:59.000Z",
} as const satisfies TemperAchievementCategory
