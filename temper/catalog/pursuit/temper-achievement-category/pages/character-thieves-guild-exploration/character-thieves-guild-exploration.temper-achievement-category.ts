import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const characterThievesGuildExploration = {
  id: "01a06168-7252-7014-8273-24cad8b38ec5",
  type: "page-type/temper-achievement-category",
  slug: "character-thieves-guild-exploration",
  title: "Exploration",
  category: "character",
  displayOrder: 0,
  parent: "temper-achievement-category/character-thieves-guild",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
