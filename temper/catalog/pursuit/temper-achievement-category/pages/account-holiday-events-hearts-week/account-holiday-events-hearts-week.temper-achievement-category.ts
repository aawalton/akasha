import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountHolidayEventsHeartsWeek = {
  id: "01a06168-724d-7006-b7bf-0464a4c08067",
  type: "page-type/temper-achievement-category",
  slug: "account-holiday-events-hearts-week",
  title: "Hearts Week",
  category: "account",
  displayOrder: 3,
  parent: "temper-achievement-category/account-holiday-events",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
