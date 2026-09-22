import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountBlackwoodGeneral = {
  id: "01a06168-724e-7011-b8db-b4efc0994439",
  type: "page-type/temper-achievement-category",
  slug: "account-blackwood-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "temper-achievement-category/account-blackwood",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
