import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountGreymoorGeneral = {
  id: "01a06168-724e-7018-bf72-4f665f572127",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-greymoor-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "account-greymoor",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
