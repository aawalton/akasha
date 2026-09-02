import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnDressers = {
  id: "01a05fcf-f7f3-7b7b-9051-6ab163db977a",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-dressers",
  title: "Dressers",
  parent: "furn-suite",
  displayOrder: 3,
  furnitureSubcategoryIds: [145],
} as const satisfies TemperItemCategoryTree
