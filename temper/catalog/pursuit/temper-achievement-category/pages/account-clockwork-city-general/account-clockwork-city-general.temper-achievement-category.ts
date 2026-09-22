import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountClockworkCityGeneral = {
  id: "01a06168-7250-7017-9239-2e0865f69f0f",
  type: "page-type/temper-achievement-category",
  slug: "account-clockwork-city-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "temper-achievement-category/account-clockwork-city",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
