import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const characterMurkmireGeneral = {
  id: "01a06168-7252-700e-b935-d1c010ff35c1",
  type: "page-type/temper-achievement-category",
  slug: "character-murkmire-general",
  title: "General",
  category: "character",
  displayOrder: 0,
  parent: "temper-achievement-category/character-murkmire",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
