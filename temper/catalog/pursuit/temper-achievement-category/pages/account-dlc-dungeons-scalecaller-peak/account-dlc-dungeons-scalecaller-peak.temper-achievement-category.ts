import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDlcDungeonsScalecallerPeak = {
  id: "01a06168-724a-7009-b5d0-32597daffc7f",
  type: "page-type/temper-achievement-category",
  slug: "account-dlc-dungeons-scalecaller-peak",
  title: "Scalecaller Peak",
  category: "account",
  displayOrder: 28,
  parent: "temper-achievement-category/account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
