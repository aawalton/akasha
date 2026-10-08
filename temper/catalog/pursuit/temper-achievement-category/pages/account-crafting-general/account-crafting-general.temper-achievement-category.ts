import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountCraftingGeneral = {
  id: "01a06168-7247-7009-a6cf-68e40a836021",
  type: "page-type/temper-achievement-category",
  slug: "account-crafting-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "temper-achievement-category/account-crafting",
  achievements: "jsonl",
  createdAt: "2026-09-02T09:17:10.087Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperAchievementCategory
