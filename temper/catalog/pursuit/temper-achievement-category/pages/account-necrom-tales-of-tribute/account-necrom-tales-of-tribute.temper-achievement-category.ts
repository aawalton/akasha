import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountNecromTalesOfTribute = {
  id: "01a06168-724e-7000-8efc-a42483129242",
  type: "page-type/temper-achievement-category",
  slug: "account-necrom-tales-of-tribute",
  title: "Tales of Tribute",
  category: "account",
  displayOrder: 1,
  parent: "temper-achievement-category/account-necrom",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
