import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDlcDungeonsRedPetalBastion = {
  id: "01a06168-724a-7007-b363-da8a34de2555",
  type: "page-type/temper-achievement-category",
  slug: "account-dlc-dungeons-red-petal-bastion",
  title: "Red Petal Bastion",
  category: "account",
  displayOrder: 26,
  parent: "temper-achievement-category/account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
