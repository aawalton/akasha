import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const characterClockworkCityGeneral = {
  id: "01a06168-7252-7010-a5b8-158eecc215f7",
  type: "page-type/temper-achievement-category",
  slug: "character-clockwork-city-general",
  title: "General",
  category: "character",
  displayOrder: 0,
  parent: "temper-achievement-category/character-clockwork-city",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
