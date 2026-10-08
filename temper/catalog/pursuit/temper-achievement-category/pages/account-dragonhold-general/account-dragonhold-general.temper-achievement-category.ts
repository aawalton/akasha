import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDragonholdGeneral = {
  id: "01a06168-7250-700d-9cb6-44746d1959f1",
  type: "page-type/temper-achievement-category",
  slug: "account-dragonhold-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "temper-achievement-category/account-dragonhold",
  achievements: "jsonl",
  createdAt: "2026-09-02T09:17:10.096Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperAchievementCategory
