import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountDragonholdGeneral = {
  id: "01a06168-7250-700d-9cb6-44746d1959f1",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-dragonhold-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "account-dragonhold",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
