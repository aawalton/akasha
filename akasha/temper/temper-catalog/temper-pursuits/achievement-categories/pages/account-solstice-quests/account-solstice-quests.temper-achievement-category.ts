import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountSolsticeQuests = {
  id: "01a06168-724d-700e-a59d-4c51a61d2e0e",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-solstice-quests",
  title: "Quests",
  category: "account",
  displayOrder: 4,
  parent: "account-solstice",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
