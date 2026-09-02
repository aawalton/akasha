import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const characterCraftingEnchanting = {
  id: "01a06168-7251-700c-92f6-67f57c33fc66",
  pageTypeSlug: "temper-achievement-category",
  slug: "character-crafting-enchanting",
  title: "Enchanting",
  category: "character",
  displayOrder: 0,
  parent: "character-crafting",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
