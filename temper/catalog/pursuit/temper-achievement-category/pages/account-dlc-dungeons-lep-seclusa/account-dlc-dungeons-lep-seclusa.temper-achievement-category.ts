import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDlcDungeonsLepSeclusa = {
  id: "01a06168-724a-7001-8e6c-60200cb94363",
  type: "page-type/temper-achievement-category",
  slug: "account-dlc-dungeons-lep-seclusa",
  title: "Lep Seclusa",
  category: "account",
  displayOrder: 20,
  parent: "temper-achievement-category/account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
