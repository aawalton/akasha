import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDlcDungeonsStoneGarden = {
  id: "01a06168-724a-700c-8785-ee60581f4bf7",
  type: "page-type/temper-achievement-category",
  slug: "account-dlc-dungeons-stone-garden",
  title: "Stone Garden",
  category: "account",
  displayOrder: 31,
  parent: "temper-achievement-category/account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
