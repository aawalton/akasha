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
} as const satisfies TemperAchievementCategory
