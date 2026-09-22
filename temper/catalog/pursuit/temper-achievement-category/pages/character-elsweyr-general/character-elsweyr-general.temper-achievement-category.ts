import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const characterElsweyrGeneral = {
  id: "01a06168-7252-7002-8814-ef498077280a",
  type: "page-type/temper-achievement-category",
  slug: "character-elsweyr-general",
  title: "General",
  category: "character",
  displayOrder: 0,
  parent: "temper-achievement-category/character-elsweyr",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
