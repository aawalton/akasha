import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountPlayerVsPlayerGeneral = {
  id: "01a06168-7247-7005-ab35-2d2fd9144a9e",
  type: "page-type/temper-achievement-category",
  slug: "account-player-vs-player-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "temper-achievement-category/account-player-vs-player",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
