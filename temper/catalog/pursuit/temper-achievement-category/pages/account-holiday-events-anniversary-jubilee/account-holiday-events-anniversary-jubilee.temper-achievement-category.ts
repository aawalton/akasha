import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountHolidayEventsAnniversaryJubilee = {
  id: "01a06168-724d-7004-b3f4-9c8530e1afc1",
  type: "page-type/temper-achievement-category",
  slug: "account-holiday-events-anniversary-jubilee",
  title: "Anniversary Jubilee",
  category: "account",
  displayOrder: 1,
  parent: "temper-achievement-category/account-holiday-events",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
