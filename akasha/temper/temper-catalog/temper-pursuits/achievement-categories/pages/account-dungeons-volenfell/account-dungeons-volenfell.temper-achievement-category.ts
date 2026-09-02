import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountDungeonsVolenfell = {
  id: "01a06168-7248-7016-a6a5-2201d6441d47",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-dungeons-volenfell",
  title: "Volenfell",
  category: "account",
  displayOrder: 21,
  parent: "account-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
