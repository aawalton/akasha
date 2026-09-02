import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnTools = {
  id: "01a05fcf-f814-73be-bd62-c4dbac15450b",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-tools",
  title: "Tools",
  parent: "furn-workshop",
  displayOrder: 5,
  furnitureSubcategoryIds: [95],
} as const satisfies TemperItemCategoryTree
