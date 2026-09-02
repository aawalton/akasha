import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountMorrowindQuests = {
  id: "01a06168-724f-7011-bf60-0dc439518048",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-morrowind-quests",
  title: "Quests",
  category: "account",
  displayOrder: 2,
  parent: "account-morrowind",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
