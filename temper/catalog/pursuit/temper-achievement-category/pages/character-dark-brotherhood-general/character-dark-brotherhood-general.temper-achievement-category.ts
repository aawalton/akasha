import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const characterDarkBrotherhoodGeneral = {
  id: "01a06168-7252-7012-954e-05b74060f810",
  type: "page-type/temper-achievement-category",
  slug: "character-dark-brotherhood-general",
  title: "General",
  category: "character",
  displayOrder: 0,
  parent: "temper-achievement-category/character-dark-brotherhood",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
