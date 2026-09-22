import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountHighIsleTalesOfTribute = {
  id: "01a06168-724e-7009-b1d5-27eb54c2add3",
  type: "page-type/temper-achievement-category",
  slug: "account-high-isle-tales-of-tribute",
  title: "Tales of Tribute",
  category: "account",
  displayOrder: 1,
  parent: "temper-achievement-category/account-high-isle",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
