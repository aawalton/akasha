import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountExplorationGeneral = {
  id: "01a06168-724b-700f-ab31-a4f89cfab2ba",
  type: "page-type/temper-achievement-category",
  slug: "account-exploration-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "temper-achievement-category/account-exploration",
  achievements: "jsonl",
  createdAt: "2026-09-02T09:17:10.091Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperAchievementCategory
