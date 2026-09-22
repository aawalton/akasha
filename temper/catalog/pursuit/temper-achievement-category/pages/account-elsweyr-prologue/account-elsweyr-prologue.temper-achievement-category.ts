import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountElsweyrPrologue = {
  id: "01a06168-724f-7006-8626-7387b924e9ff",
  type: "page-type/temper-achievement-category",
  slug: "account-elsweyr-prologue",
  title: "Prologue",
  category: "account",
  displayOrder: 1,
  parent: "temper-achievement-category/account-elsweyr",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
