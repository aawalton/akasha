import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountMorrowindExploration = {
  id: "01a06168-724f-7010-a85c-97e44501aa54",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-morrowind-exploration",
  title: "Exploration",
  category: "account",
  displayOrder: 1,
  parent: "account-morrowind",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
