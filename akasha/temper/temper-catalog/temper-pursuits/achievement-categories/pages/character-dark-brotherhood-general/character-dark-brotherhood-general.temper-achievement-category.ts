import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const characterDarkBrotherhoodGeneral = {
  id: "01a06168-7252-7012-954e-05b74060f810",
  pageTypeSlug: "temper-achievement-category",
  slug: "character-dark-brotherhood-general",
  title: "General",
  category: "character",
  displayOrder: 0,
  parent: "character-dark-brotherhood",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
