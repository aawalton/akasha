import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountCraftingWoodworking = {
  id: "01a06168-7247-7010-8606-7a1057093730",
  type: "page-type/temper-achievement-category",
  slug: "account-crafting-woodworking",
  title: "Woodworking",
  category: "account",
  displayOrder: 7,
  parent: "temper-achievement-category/account-crafting",
  achievements: "jsonl",
  createdAt: "2026-09-02T09:17:10.087Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperAchievementCategory
