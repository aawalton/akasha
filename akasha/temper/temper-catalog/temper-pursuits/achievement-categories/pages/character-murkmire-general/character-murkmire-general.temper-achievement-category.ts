import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const characterMurkmireGeneral = {
  id: "01a06168-7252-700e-b935-d1c010ff35c1",
  pageTypeSlug: "temper-achievement-category",
  slug: "character-murkmire-general",
  title: "General",
  category: "character",
  displayOrder: 0,
  parent: "character-murkmire",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
