import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountExplorationDaggerfallCovenant = {
  id: "01a06168-724b-7011-8290-888b15f66b5d",
  type: "page-type/temper-achievement-category",
  slug: "account-exploration-daggerfall-covenant",
  title: "Daggerfall Covenant",
  category: "account",
  displayOrder: 2,
  parent: "temper-achievement-category/account-exploration",
  achievements: "jsonl",
  createdAt: "2026-09-02T09:17:10.091Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperAchievementCategory
