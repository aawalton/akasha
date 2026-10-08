import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountQuestsCyrodiil = {
  id: "01a06168-724c-700a-8be1-bb66f28868d0",
  type: "page-type/temper-achievement-category",
  slug: "account-quests-cyrodiil",
  title: "Cyrodiil",
  category: "account",
  displayOrder: 7,
  parent: "temper-achievement-category/account-quests",
  achievements: "jsonl",
  createdAt: "2026-09-02T09:17:10.092Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperAchievementCategory
