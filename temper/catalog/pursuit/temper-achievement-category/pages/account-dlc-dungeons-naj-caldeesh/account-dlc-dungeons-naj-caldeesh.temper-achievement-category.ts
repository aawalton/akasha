import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDlcDungeonsNajCaldeesh = {
  id: "01a06168-724a-7005-b7d5-7f46264d2bb7",
  type: "page-type/temper-achievement-category",
  slug: "account-dlc-dungeons-naj-caldeesh",
  title: "Naj-Caldeesh",
  category: "account",
  displayOrder: 24,
  parent: "temper-achievement-category/account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
