import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const characterCraftingEnchanting = {
  id: "01a06168-7251-700c-92f6-67f57c33fc66",
  type: "page-type/temper-achievement-category",
  slug: "character-crafting-enchanting",
  title: "Enchanting",
  category: "character",
  displayOrder: 0,
  parent: "temper-achievement-category/character-crafting",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
