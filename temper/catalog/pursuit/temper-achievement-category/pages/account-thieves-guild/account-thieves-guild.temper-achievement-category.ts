import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountThievesGuild = {
  id: "01a06168-7251-7001-96e9-b078bbfab0bf",
  type: "page-type/temper-achievement-category",
  slug: "account-thieves-guild",
  title: "Thieves Guild",
  category: "account",
  displayOrder: 30,
  activity: "temper-activity-category/exploration",
  createdAt: "2026-09-02T09:17:10.097Z",
  updatedAt: "2026-09-27T03:05:59.000Z",
} as const satisfies TemperAchievementCategory
