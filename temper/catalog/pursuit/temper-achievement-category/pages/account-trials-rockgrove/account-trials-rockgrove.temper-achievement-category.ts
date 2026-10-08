import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountTrialsRockgrove = {
  id: "01a06168-724b-7005-864e-b3f25d4cd0f5",
  type: "page-type/temper-achievement-category",
  slug: "account-trials-rockgrove",
  title: "Rockgrove",
  category: "account",
  displayOrder: 11,
  parent: "temper-achievement-category/account-trials",
  achievements: "jsonl",
  activity: "temper-activity-category/trials",
  createdAt: "2026-09-02T09:17:10.091Z",
  updatedAt: "2026-09-27T03:05:59.000Z",
} as const satisfies TemperAchievementCategory
