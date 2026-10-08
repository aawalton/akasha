import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const characterThievesGuild = {
  id: "01a06168-7252-7013-90ec-4ead953f0cc9",
  type: "page-type/temper-achievement-category",
  slug: "character-thieves-guild",
  title: "Thieves Guild",
  category: "character",
  displayOrder: 17,
  activity: "temper-activity-category/exploration",
  createdAt: "2026-09-02T09:17:10.098Z",
  updatedAt: "2026-09-27T03:05:59.000Z",
} as const satisfies TemperAchievementCategory
