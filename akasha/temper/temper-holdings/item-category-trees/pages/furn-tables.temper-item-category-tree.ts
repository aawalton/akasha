import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnTables = {
  id: "01a05fcf-f812-7ec2-9a19-1bfc4535b0c6",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-tables",
  title: "Tables",
  parent: "furn-dining",
  displayOrder: 3,
  furnitureSubcategoryIds: [65],
} as const satisfies TemperItemCategoryTree
