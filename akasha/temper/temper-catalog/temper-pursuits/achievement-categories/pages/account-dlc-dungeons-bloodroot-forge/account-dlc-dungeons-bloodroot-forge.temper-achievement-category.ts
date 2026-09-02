import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountDlcDungeonsBloodrootForge = {
  id: "01a06168-7249-7009-b4dc-e9c384ab670f",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-dlc-dungeons-bloodroot-forge",
  title: "Bloodroot Forge",
  category: "account",
  displayOrder: 5,
  parent: "account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
