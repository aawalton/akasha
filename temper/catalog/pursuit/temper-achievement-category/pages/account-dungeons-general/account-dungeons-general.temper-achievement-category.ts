import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDungeonsGeneral = {
  id: "01a06168-7248-7001-adbd-3b582484e0f2",
  type: "page-type/temper-achievement-category",
  slug: "account-dungeons-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "temper-achievement-category/account-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
