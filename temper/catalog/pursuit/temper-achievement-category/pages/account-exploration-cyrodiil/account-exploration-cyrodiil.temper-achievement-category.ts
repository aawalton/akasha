import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountExplorationCyrodiil = {
  id: "01a06168-724b-7015-95ef-f486d7256ce2",
  type: "page-type/temper-achievement-category",
  slug: "account-exploration-cyrodiil",
  title: "Cyrodiil",
  category: "account",
  displayOrder: 6,
  parent: "temper-achievement-category/account-exploration",
  achievements: "jsonl",
  createdAt: "2026-09-02T09:17:10.091Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperAchievementCategory
