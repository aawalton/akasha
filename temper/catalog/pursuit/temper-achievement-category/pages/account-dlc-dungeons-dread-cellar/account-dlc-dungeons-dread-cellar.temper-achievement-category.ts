import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDlcDungeonsDreadCellar = {
  id: "01a06168-7249-700e-935d-30da9b448cef",
  type: "page-type/temper-achievement-category",
  slug: "account-dlc-dungeons-dread-cellar",
  title: "Dread Cellar",
  category: "account",
  displayOrder: 10,
  parent: "temper-achievement-category/account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
