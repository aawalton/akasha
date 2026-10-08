import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountArenasVateshranHollows = {
  id: "01a06168-724b-700d-aa3b-29a1d78b879c",
  type: "page-type/temper-achievement-category",
  slug: "account-arenas-vateshran-hollows",
  title: "Vateshran Hollows",
  category: "account",
  displayOrder: 3,
  parent: "temper-achievement-category/account-arenas",
  achievements: "jsonl",
  activity: "temper-activity-category/arenas",
  createdAt: "2026-09-02T09:17:10.091Z",
  updatedAt: "2026-09-27T03:05:59.000Z",
} as const satisfies TemperAchievementCategory
