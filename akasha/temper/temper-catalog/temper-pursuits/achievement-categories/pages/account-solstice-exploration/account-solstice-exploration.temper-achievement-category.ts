import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountSolsticeExploration = {
  id: "01a06168-724d-700c-9daa-dd025c425d33",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-solstice-exploration",
  title: "Exploration",
  category: "account",
  displayOrder: 2,
  parent: "account-solstice",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
