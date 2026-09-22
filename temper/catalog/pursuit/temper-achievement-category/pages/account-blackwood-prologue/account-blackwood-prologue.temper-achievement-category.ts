import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountBlackwoodPrologue = {
  id: "01a06168-724e-7015-bb88-08c8ecf21d0d",
  type: "page-type/temper-achievement-category",
  slug: "account-blackwood-prologue",
  title: "Prologue",
  category: "account",
  displayOrder: 4,
  parent: "temper-achievement-category/account-blackwood",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
