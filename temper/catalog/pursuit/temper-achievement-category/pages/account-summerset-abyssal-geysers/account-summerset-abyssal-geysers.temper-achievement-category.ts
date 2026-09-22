import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountSummersetAbyssalGeysers = {
  id: "01a06168-724f-700d-b975-f66c2715e13a",
  type: "page-type/temper-achievement-category",
  slug: "account-summerset-abyssal-geysers",
  title: "Abyssal Geysers",
  category: "account",
  displayOrder: 3,
  parent: "temper-achievement-category/account-summerset",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
