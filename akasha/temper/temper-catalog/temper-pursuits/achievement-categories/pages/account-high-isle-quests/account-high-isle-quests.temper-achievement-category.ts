import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountHighIsleQuests = {
  id: "01a06168-724e-700b-8c2c-68873a2a93a4",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-high-isle-quests",
  title: "Quests",
  category: "account",
  displayOrder: 3,
  parent: "account-high-isle",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
