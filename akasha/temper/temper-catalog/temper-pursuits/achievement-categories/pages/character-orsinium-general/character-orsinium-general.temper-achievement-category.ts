import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const characterOrsiniumGeneral = {
  id: "01a06168-7252-7016-8a86-fd5236aef167",
  pageTypeSlug: "temper-achievement-category",
  slug: "character-orsinium-general",
  title: "General",
  category: "character",
  displayOrder: 0,
  parent: "character-orsinium",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
