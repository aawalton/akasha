import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDragonholdPrologue = {
  id: "01a06168-7250-700f-af60-fa0924f8b2a8",
  type: "page-type/temper-achievement-category",
  slug: "account-dragonhold-prologue",
  title: "Prologue",
  category: "account",
  displayOrder: 2,
  parent: "temper-achievement-category/account-dragonhold",
  achievements: "jsonl",
  createdAt: "2026-09-02T09:17:10.096Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperAchievementCategory
