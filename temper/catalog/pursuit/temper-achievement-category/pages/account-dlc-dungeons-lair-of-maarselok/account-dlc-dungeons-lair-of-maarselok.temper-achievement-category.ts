import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDlcDungeonsLairOfMaarselok = {
  id: "01a06168-724a-7000-9772-cab6397eb9f8",
  type: "page-type/temper-achievement-category",
  slug: "account-dlc-dungeons-lair-of-maarselok",
  title: "Lair of Maarselok",
  category: "account",
  displayOrder: 19,
  parent: "temper-achievement-category/account-dlc-dungeons",
  achievements: "jsonl",
  createdAt: "2026-09-02T09:17:10.090Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperAchievementCategory
