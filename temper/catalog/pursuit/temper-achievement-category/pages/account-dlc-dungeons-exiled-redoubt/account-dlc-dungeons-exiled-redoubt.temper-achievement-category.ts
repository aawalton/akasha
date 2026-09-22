import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDlcDungeonsExiledRedoubt = {
  id: "01a06168-7249-7010-8005-3d792824ea0e",
  type: "page-type/temper-achievement-category",
  slug: "account-dlc-dungeons-exiled-redoubt",
  title: "Exiled Redoubt",
  category: "account",
  displayOrder: 12,
  parent: "temper-achievement-category/account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
