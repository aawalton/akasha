import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountHighIsleAntiquities = {
  id: "01a06168-724e-700e-8aa5-8028f4bda775",
  type: "page-type/temper-achievement-category",
  slug: "account-high-isle-antiquities",
  title: "Antiquities",
  category: "account",
  displayOrder: 6,
  parent: "temper-achievement-category/account-high-isle",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
