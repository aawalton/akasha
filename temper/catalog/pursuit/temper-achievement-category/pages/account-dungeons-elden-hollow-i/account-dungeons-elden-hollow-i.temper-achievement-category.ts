import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDungeonsEldenHollowI = {
  id: "01a06168-7248-700e-ad50-6384841f39b0",
  type: "page-type/temper-achievement-category",
  slug: "account-dungeons-elden-hollow-i",
  title: "Elden Hollow I",
  category: "account",
  displayOrder: 13,
  parent: "temper-achievement-category/account-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
