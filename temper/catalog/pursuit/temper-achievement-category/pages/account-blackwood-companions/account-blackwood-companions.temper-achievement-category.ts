import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountBlackwoodCompanions = {
  id: "01a06168-724e-7012-868a-5144c9a3c08f",
  type: "page-type/temper-achievement-category",
  slug: "account-blackwood-companions",
  title: "Companions",
  category: "account",
  displayOrder: 1,
  parent: "temper-achievement-category/account-blackwood",
  achievements: "jsonl",
  activity: "temper-activity-category/companions",
  createdAt: "2026-09-02T09:17:10.094Z",
  updatedAt: "2026-09-27T03:05:59.000Z",
} as const satisfies TemperAchievementCategory
