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
  activity: "temper-activity-category/trials",
  createdAt: "2026-09-02T09:17:10.091Z",
  updatedAt: "2026-09-27T03:05:59.000Z",
} as const satisfies TemperAchievementCategory
