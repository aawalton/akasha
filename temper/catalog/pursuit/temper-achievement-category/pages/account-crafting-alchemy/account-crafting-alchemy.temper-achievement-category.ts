import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountCraftingAlchemy = {
  id: "01a06168-7247-700a-85f6-fe4385d516f3",
  type: "page-type/temper-achievement-category",
  slug: "account-crafting-alchemy",
  title: "Alchemy",
  category: "account",
  displayOrder: 1,
  parent: "temper-achievement-category/account-crafting",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
