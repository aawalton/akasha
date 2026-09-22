import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDlcDungeonsFangLair = {
  id: "01a06168-7249-7012-af7f-4bbf638f8942",
  type: "page-type/temper-achievement-category",
  slug: "account-dlc-dungeons-fang-lair",
  title: "Fang Lair",
  category: "account",
  displayOrder: 14,
  parent: "temper-achievement-category/account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
