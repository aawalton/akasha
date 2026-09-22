import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const characterDragonholdGeneral = {
  id: "01a06168-7252-700b-ae72-f504c2001c25",
  type: "page-type/temper-achievement-category",
  slug: "character-dragonhold-general",
  title: "General",
  category: "character",
  displayOrder: 0,
  parent: "temper-achievement-category/character-dragonhold",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
