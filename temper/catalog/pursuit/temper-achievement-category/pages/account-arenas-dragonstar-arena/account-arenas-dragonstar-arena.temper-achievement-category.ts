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
} as const satisfies TemperAchievementCategory
