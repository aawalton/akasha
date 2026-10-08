import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountCraftingBlacksmithing = {
  id: "01a06168-7247-700b-b1f4-ab15514f449d",
  type: "page-type/temper-achievement-category",
  slug: "account-crafting-blacksmithing",
  title: "Blacksmithing",
  category: "account",
  displayOrder: 2,
  parent: "temper-achievement-category/account-crafting",
  achievements: "jsonl",
  createdAt: "2026-09-02T09:17:10.087Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperAchievementCategory
