import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountArenasDragonstarArena = {
  id: "01a06168-724b-700b-9abc-291da6090401",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-arenas-dragonstar-arena",
  title: "Dragonstar Arena",
  category: "account",
  displayOrder: 1,
  parent: "account-arenas",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
