import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountNightMarketBosses = {
  id: "01a06168-724c-700d-81f7-5fa7e719d5e1",
  type: "page-type/temper-achievement-category",
  slug: "account-night-market-bosses",
  title: "Bosses",
  category: "account",
  displayOrder: 1,
  parent: "temper-achievement-category/account-night-market",
  achievements: "jsonl",
  createdAt: "2026-09-02T09:17:10.092Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperAchievementCategory
