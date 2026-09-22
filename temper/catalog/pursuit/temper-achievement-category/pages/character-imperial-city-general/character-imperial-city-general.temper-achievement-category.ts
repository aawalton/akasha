import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const characterImperialCityGeneral = {
  id: "01a06168-7252-7019-995e-4ab4d14c14be",
  type: "page-type/temper-achievement-category",
  slug: "character-imperial-city-general",
  title: "General",
  category: "character",
  displayOrder: 0,
  parent: "temper-achievement-category/character-imperial-city",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
