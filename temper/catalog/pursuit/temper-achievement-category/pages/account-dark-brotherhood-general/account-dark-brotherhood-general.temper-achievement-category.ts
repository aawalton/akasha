import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDarkBrotherhoodGeneral = {
  id: "01a06168-7250-701b-9b02-6aa24bb53978",
  type: "page-type/temper-achievement-category",
  slug: "account-dark-brotherhood-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "temper-achievement-category/account-dark-brotherhood",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
