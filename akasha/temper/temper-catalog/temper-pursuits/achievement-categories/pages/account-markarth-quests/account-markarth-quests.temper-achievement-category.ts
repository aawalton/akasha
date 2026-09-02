import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountMarkarthQuests = {
  id: "01a06168-7250-700a-a406-26276f3254a6",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-markarth-quests",
  title: "Quests",
  category: "account",
  displayOrder: 3,
  parent: "account-markarth",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
