import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountPlayerVsPlayerBattlegrounds = {
  id: "01a06168-7247-7007-9238-47e1443b4864",
  type: "page-type/temper-achievement-category",
  slug: "account-player-vs-player-battlegrounds",
  title: "Battlegrounds",
  category: "account",
  displayOrder: 2,
  parent: "temper-achievement-category/account-player-vs-player",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
