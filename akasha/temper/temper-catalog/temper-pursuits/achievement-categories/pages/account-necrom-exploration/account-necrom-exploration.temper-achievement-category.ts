import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountNecromExploration = {
  id: "01a06168-724e-7003-99c1-b0c66403df61",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-necrom-exploration",
  title: "Exploration",
  category: "account",
  displayOrder: 4,
  parent: "account-necrom",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
