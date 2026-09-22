import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountNecromCompanions = {
  id: "01a06168-724e-7001-add9-3376d73ffc9c",
  type: "page-type/temper-achievement-category",
  slug: "account-necrom-companions",
  title: "Companions",
  category: "account",
  displayOrder: 2,
  parent: "temper-achievement-category/account-necrom",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
