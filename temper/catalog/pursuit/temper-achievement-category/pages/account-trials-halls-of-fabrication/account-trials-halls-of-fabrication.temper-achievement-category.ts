import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountTrialsHallsOfFabrication = {
  id: "01a06168-724a-7016-977a-63be18b74f3a",
  type: "page-type/temper-achievement-category",
  slug: "account-trials-halls-of-fabrication",
  title: "Halls of Fabrication",
  category: "account",
  displayOrder: 5,
  parent: "temper-achievement-category/account-trials",
  achievements: "jsonl",
  activity: "temper-activity-category/trials",
  createdAt: "2026-09-02T09:17:10.090Z",
  updatedAt: "2026-09-27T03:05:59.000Z",
} as const satisfies TemperAchievementCategory
