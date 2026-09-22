import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountHolidayEventsNewLifeFestival = {
  id: "01a06168-724d-7007-bb98-5fa802714fe3",
  type: "page-type/temper-achievement-category",
  slug: "account-holiday-events-new-life-festival",
  title: "New Life Festival",
  category: "account",
  displayOrder: 4,
  parent: "temper-achievement-category/account-holiday-events",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
