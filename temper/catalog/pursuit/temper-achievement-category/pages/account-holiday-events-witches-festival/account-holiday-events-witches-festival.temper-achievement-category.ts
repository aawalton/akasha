import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountHolidayEventsWitchesFestival = {
  id: "01a06168-724d-7008-9e04-07fb81215ea5",
  type: "page-type/temper-achievement-category",
  slug: "account-holiday-events-witches-festival",
  title: "Witches Festival",
  category: "account",
  displayOrder: 5,
  parent: "temper-achievement-category/account-holiday-events",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
