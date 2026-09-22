import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountNecromExploration = {
  id: "01a06168-724e-7003-99c1-b0c66403df61",
  type: "page-type/temper-achievement-category",
  slug: "account-necrom-exploration",
  title: "Exploration",
  category: "account",
  displayOrder: 4,
  parent: "temper-achievement-category/account-necrom",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
