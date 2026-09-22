import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDlcDungeonsCoralAerie = {
  id: "01a06168-7249-700b-b40b-b66dce15253d",
  type: "page-type/temper-achievement-category",
  slug: "account-dlc-dungeons-coral-aerie",
  title: "Coral Aerie",
  category: "account",
  displayOrder: 7,
  parent: "temper-achievement-category/account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
