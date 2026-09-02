import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountCraftingBlacksmithing = {
  id: "01a06168-7247-700b-b1f4-ab15514f449d",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-crafting-blacksmithing",
  title: "Blacksmithing",
  category: "account",
  displayOrder: 2,
  parent: "account-crafting",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
