import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountDungeonsArxCorinium = {
  id: "01a06168-7248-7002-9c83-4f1e55303db6",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-dungeons-arx-corinium",
  title: "Arx Corinium",
  category: "account",
  displayOrder: 1,
  parent: "account-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
