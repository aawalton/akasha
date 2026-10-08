import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDeadlandsAntiquities = {
  id: "01a06168-7250-7005-bf48-3b5023ac09fd",
  type: "page-type/temper-achievement-category",
  slug: "account-deadlands-antiquities",
  title: "Antiquities",
  category: "account",
  displayOrder: 4,
  parent: "temper-achievement-category/account-deadlands",
  achievements: "jsonl",
  activity: "temper-activity-category/exploration",
  createdAt: "2026-09-02T09:17:10.096Z",
  updatedAt: "2026-09-27T03:05:59.000Z",
} as const satisfies TemperAchievementCategory
