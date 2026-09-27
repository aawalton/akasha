import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountGoldRoad = {
  id: "01a06168-724d-7010-b557-1c514a2aad05",
  type: "page-type/temper-achievement-category",
  slug: "account-gold-road",
  title: "Gold Road",
  category: "account",
  displayOrder: 15,
  activity: "temper-activity-category/exploration",
} as const satisfies TemperAchievementCategory
