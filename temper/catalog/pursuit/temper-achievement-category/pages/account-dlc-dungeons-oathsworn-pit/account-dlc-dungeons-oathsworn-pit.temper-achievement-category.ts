import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDlcDungeonsOathswornPit = {
  id: "01a06168-724a-7006-8388-7206bf1231bc",
  type: "page-type/temper-achievement-category",
  slug: "account-dlc-dungeons-oathsworn-pit",
  title: "Oathsworn Pit",
  category: "account",
  displayOrder: 25,
  parent: "temper-achievement-category/account-dlc-dungeons",
  achievements: "jsonl",
  createdAt: "2026-09-02T09:17:10.090Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperAchievementCategory
