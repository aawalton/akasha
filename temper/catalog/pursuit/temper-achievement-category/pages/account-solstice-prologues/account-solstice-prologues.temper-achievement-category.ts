import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountSolsticePrologues = {
  id: "01a06168-724d-700d-b33e-e44ccf5c3438",
  type: "page-type/temper-achievement-category",
  slug: "account-solstice-prologues",
  title: "Prologues",
  category: "account",
  displayOrder: 3,
  parent: "temper-achievement-category/account-solstice",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
