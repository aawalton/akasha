import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountNecromAntiquities = {
  id: "01a06168-724e-7002-b540-cd8ec86b3f79",
  type: "page-type/temper-achievement-category",
  slug: "account-necrom-antiquities",
  title: "Antiquities",
  category: "account",
  displayOrder: 3,
  parent: "temper-achievement-category/account-necrom",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
