import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountQuestsDaggerfallCovenant = {
  id: "01a06168-724c-7006-b954-5240a27133af",
  type: "page-type/temper-achievement-category",
  slug: "account-quests-daggerfall-covenant",
  title: "Daggerfall Covenant",
  category: "account",
  displayOrder: 3,
  parent: "temper-achievement-category/account-quests",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
