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
  createdAt: "2026-09-02T09:17:10.092Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperAchievementCategory
