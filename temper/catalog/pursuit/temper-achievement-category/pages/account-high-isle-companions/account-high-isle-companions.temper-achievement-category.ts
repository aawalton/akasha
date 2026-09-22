import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountHighIsleCompanions = {
  id: "01a06168-724e-700c-b26b-cb6c1e95f137",
  type: "page-type/temper-achievement-category",
  slug: "account-high-isle-companions",
  title: "Companions",
  category: "account",
  displayOrder: 4,
  parent: "temper-achievement-category/account-high-isle",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
