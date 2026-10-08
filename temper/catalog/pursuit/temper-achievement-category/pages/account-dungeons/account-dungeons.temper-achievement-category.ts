import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDungeons = {
  id: "01a06168-7248-7000-979a-4a4bb8e6bf75",
  type: "page-type/temper-achievement-category",
  slug: "account-dungeons",
  title: "Dungeons",
  category: "account",
  displayOrder: 4,
  activity: "temper-activity-category/group-dungeons",
  createdAt: "2026-09-02T09:17:10.088Z",
  updatedAt: "2026-09-27T03:05:59.000Z",
} as const satisfies TemperAchievementCategory
