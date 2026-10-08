import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountArenasDragonstarArena = {
  id: "01a06168-724b-700b-9abc-291da6090401",
  type: "page-type/temper-achievement-category",
  slug: "account-arenas-dragonstar-arena",
  title: "Dragonstar Arena",
  category: "account",
  displayOrder: 1,
  parent: "temper-achievement-category/account-arenas",
  achievements: "jsonl",
  createdAt: "2026-09-02T09:17:10.091Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperAchievementCategory
