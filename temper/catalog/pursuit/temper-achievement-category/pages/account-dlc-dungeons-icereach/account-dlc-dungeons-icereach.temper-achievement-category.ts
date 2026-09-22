import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDlcDungeonsIcereach = {
  id: "01a06168-7249-7015-b998-ba23d60bd4fa",
  type: "page-type/temper-achievement-category",
  slug: "account-dlc-dungeons-icereach",
  title: "Icereach",
  category: "account",
  displayOrder: 17,
  parent: "temper-achievement-category/account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
