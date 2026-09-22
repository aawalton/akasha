import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountCraftingEnchanting = {
  id: "01a06168-7247-700d-9799-7c8f71953593",
  type: "page-type/temper-achievement-category",
  slug: "account-crafting-enchanting",
  title: "Enchanting",
  category: "account",
  displayOrder: 4,
  parent: "temper-achievement-category/account-crafting",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
