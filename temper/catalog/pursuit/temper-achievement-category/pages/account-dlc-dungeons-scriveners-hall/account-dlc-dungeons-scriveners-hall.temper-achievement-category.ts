import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDlcDungeonsScrivenersHall = {
  id: "01a06168-724a-700a-a5c5-54552fa7a3bd",
  type: "page-type/temper-achievement-category",
  slug: "account-dlc-dungeons-scriveners-hall",
  title: "Scrivener's Hall",
  category: "account",
  displayOrder: 29,
  parent: "temper-achievement-category/account-dlc-dungeons",
  achievements: "jsonl",
  createdAt: "2026-09-02T09:17:10.090Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperAchievementCategory
