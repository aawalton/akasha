import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountDlcDungeonsExiledRedoubt = {
  id: "01a06168-7249-7010-8005-3d792824ea0e",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-dlc-dungeons-exiled-redoubt",
  title: "Exiled Redoubt",
  category: "account",
  displayOrder: 12,
  parent: "account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
