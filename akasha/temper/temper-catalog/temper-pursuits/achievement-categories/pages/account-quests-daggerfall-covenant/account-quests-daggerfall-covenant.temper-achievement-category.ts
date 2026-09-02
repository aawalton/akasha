import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountQuestsDaggerfallCovenant = {
  id: "01a06168-724c-7006-b954-5240a27133af",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-quests-daggerfall-covenant",
  title: "Daggerfall Covenant",
  category: "account",
  displayOrder: 3,
  parent: "account-quests",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
