import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnMeatsCheeses = {
  id: "01a05fcf-f801-70ea-ac18-3329b3569db4",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-meats-cheeses",
  title: "Meats and Cheeses",
  parent: "furn-hearth",
  displayOrder: 9,
  furnitureSubcategoryIds: [154],
} as const satisfies TemperItemCategoryTree
