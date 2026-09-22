import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDlcDungeonsBedlamVeil = {
  id: "01a06168-7249-7006-827e-850488f6fe68",
  type: "page-type/temper-achievement-category",
  slug: "account-dlc-dungeons-bedlam-veil",
  title: "Bedlam Veil",
  category: "account",
  displayOrder: 2,
  parent: "temper-achievement-category/account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
