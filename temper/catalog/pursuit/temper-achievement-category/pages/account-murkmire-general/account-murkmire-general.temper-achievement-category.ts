import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountMurkmireGeneral = {
  id: "01a06168-7250-7012-b736-81a6a6df094e",
  type: "page-type/temper-achievement-category",
  slug: "account-murkmire-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "temper-achievement-category/account-murkmire",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
