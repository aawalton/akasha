import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDungeonsEldenHollowIi = {
  id: "01a06168-7248-700f-b0f2-40ce3da39294",
  type: "page-type/temper-achievement-category",
  slug: "account-dungeons-elden-hollow-ii",
  title: "Elden Hollow II",
  category: "account",
  displayOrder: 14,
  parent: "temper-achievement-category/account-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
