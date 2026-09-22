import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDungeonsSpindleclutchI = {
  id: "01a06168-7248-7013-b8ef-5177d32d6748",
  type: "page-type/temper-achievement-category",
  slug: "account-dungeons-spindleclutch-i",
  title: "Spindleclutch I",
  category: "account",
  displayOrder: 18,
  parent: "temper-achievement-category/account-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
