import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const characterMorrowindGeneral = {
  id: "01a06168-7252-7008-97e2-c9c4ef278c14",
  pageTypeSlug: "temper-achievement-category",
  slug: "character-morrowind-general",
  title: "General",
  category: "character",
  displayOrder: 0,
  parent: "character-morrowind",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
