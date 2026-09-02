import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnHouseguests = {
  id: "01a05fcf-f7fb-7e70-9002-a91d69337ffe",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-houseguests",
  title: "Houseguests",
  parent: "furn-services",
  displayOrder: 4,
  furnitureSubcategoryIds: [188],
} as const satisfies TemperItemCategoryTree
