import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountCraftingJewelryCrafting = {
  id: "01a06168-7247-700e-849a-0cb4d4650725",
  type: "page-type/temper-achievement-category",
  slug: "account-crafting-jewelry-crafting",
  title: "Jewelry Crafting",
  category: "account",
  displayOrder: 5,
  parent: "temper-achievement-category/account-crafting",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
