import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountCraftingOutfitting = {
  id: "01a06168-7247-7011-8ab2-99cc09dd83eb",
  type: "page-type/temper-achievement-category",
  slug: "account-crafting-outfitting",
  title: "Outfitting",
  category: "account",
  displayOrder: 8,
  parent: "temper-achievement-category/account-crafting",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
