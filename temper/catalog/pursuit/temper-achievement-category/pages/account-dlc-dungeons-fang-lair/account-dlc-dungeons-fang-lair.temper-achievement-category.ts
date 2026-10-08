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
  createdAt: "2026-09-02T09:17:10.089Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperAchievementCategory
