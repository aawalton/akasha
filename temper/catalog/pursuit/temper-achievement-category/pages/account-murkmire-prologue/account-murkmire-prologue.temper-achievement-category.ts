import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountMurkmirePrologue = {
  id: "01a06168-7250-7014-a03a-aa4ed2bc0337",
  type: "page-type/temper-achievement-category",
  slug: "account-murkmire-prologue",
  title: "Prologue",
  category: "account",
  displayOrder: 2,
  parent: "temper-achievement-category/account-murkmire",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
