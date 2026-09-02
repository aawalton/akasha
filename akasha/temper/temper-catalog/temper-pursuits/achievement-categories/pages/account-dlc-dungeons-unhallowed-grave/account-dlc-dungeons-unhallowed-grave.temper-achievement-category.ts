import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountDlcDungeonsUnhallowedGrave = {
  id: "01a06168-724a-700e-8ca9-f5eafd0c532e",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-dlc-dungeons-unhallowed-grave",
  title: "Unhallowed Grave",
  category: "account",
  displayOrder: 33,
  parent: "account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
