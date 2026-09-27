import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountOrsiniumExploration = {
  id: "01a06168-7251-7007-98e9-80e73db57b36",
  type: "page-type/temper-achievement-category",
  slug: "account-orsinium-exploration",
  title: "Exploration",
  category: "account",
  displayOrder: 1,
  parent: "temper-achievement-category/account-orsinium",
  achievements: "jsonl",
  activity: "temper-activity-category/exploration",
} as const satisfies TemperAchievementCategory
