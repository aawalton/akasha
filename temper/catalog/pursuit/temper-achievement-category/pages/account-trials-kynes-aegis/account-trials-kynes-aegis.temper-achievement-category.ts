import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountTrialsKynesAegis = {
  id: "01a06168-724b-7001-9191-a53f5c73a643",
  type: "page-type/temper-achievement-category",
  slug: "account-trials-kynes-aegis",
  title: "Kyne's Aegis",
  category: "account",
  displayOrder: 7,
  parent: "temper-achievement-category/account-trials",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
