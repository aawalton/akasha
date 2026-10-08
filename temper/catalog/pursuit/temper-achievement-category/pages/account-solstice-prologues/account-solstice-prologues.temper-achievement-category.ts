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
  createdAt: "2026-09-02T09:17:10.093Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperAchievementCategory
