import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountMurkmireExploration = {
  id: "01a06168-7250-7013-9e82-c648945e7faa",
  type: "page-type/temper-achievement-category",
  slug: "account-murkmire-exploration",
  title: "Exploration",
  category: "account",
  displayOrder: 1,
  parent: "temper-achievement-category/account-murkmire",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
