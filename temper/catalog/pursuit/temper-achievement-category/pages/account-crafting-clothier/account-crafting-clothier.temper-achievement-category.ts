import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountCraftingClothier = {
  id: "01a06168-7247-700c-9f89-173a1c710ad5",
  type: "page-type/temper-achievement-category",
  slug: "account-crafting-clothier",
  title: "Clothier",
  category: "account",
  displayOrder: 3,
  parent: "temper-achievement-category/account-crafting",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
