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
  createdAt: "2026-09-02T09:17:10.089Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperAchievementCategory
