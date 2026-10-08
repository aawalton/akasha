import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountQuestsGeneral = {
  id: "01a06168-724c-7003-8f89-3d12cbe30977",
  type: "page-type/temper-achievement-category",
  slug: "account-quests-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "temper-achievement-category/account-quests",
  achievements: "jsonl",
  createdAt: "2026-09-02T09:17:10.092Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperAchievementCategory
