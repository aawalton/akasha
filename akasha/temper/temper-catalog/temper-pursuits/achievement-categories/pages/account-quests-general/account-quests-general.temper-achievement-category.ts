import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountQuestsGeneral = {
  id: "01a06168-724c-7003-8f89-3d12cbe30977",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-quests-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "account-quests",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
