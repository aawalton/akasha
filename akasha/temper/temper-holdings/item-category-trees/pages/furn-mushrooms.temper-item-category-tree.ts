import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnMushrooms = {
  id: "01a05fcf-f804-70c3-8448-53e496a4e3f9",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-mushrooms",
  title: "Mushrooms",
  parent: "furn-conservatory",
  displayOrder: 9,
  furnitureSubcategoryIds: [142],
} as const satisfies TemperItemCategoryTree
