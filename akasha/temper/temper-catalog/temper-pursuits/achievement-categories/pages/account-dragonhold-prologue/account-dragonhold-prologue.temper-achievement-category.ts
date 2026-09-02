import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountDragonholdPrologue = {
  id: "01a06168-7250-700f-af60-fa0924f8b2a8",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-dragonhold-prologue",
  title: "Prologue",
  category: "account",
  displayOrder: 2,
  parent: "account-dragonhold",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
