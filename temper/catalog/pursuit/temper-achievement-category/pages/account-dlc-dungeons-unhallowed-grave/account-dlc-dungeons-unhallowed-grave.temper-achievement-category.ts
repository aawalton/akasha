import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDlcDungeonsUnhallowedGrave = {
  id: "01a06168-724a-700e-8ca9-f5eafd0c532e",
  type: "page-type/temper-achievement-category",
  slug: "account-dlc-dungeons-unhallowed-grave",
  title: "Unhallowed Grave",
  category: "account",
  displayOrder: 33,
  parent: "temper-achievement-category/account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
