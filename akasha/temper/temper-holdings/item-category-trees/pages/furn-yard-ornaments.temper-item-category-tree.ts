import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnYardOrnaments = {
  id: "01a05fcf-f81c-7af0-b09f-6983bb02f5c5",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-yard-ornaments",
  title: "Yard Ornaments",
  parent: "furn-courtyard",
  displayOrder: 5,
  furnitureSubcategoryIds: [98],
} as const satisfies TemperItemCategoryTree
