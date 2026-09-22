import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountGreymoorHarrowstorms = {
  id: "01a06168-724f-7003-a927-da6ddb988408",
  type: "page-type/temper-achievement-category",
  slug: "account-greymoor-harrowstorms",
  title: "Harrowstorms",
  category: "account",
  displayOrder: 5,
  parent: "temper-achievement-category/account-greymoor",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
