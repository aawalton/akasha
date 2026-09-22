import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const characterSummersetGeneral = {
  id: "01a06168-7252-7005-8f0e-7f92e43e2bcc",
  type: "page-type/temper-achievement-category",
  slug: "character-summerset-general",
  title: "General",
  category: "character",
  displayOrder: 0,
  parent: "temper-achievement-category/character-summerset",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
