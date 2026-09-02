import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnStools = {
  id: "01a05fcf-f810-775a-bb8c-dd2117c65348",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-stools",
  title: "Stools",
  parent: "furn-workshop",
  displayOrder: 4,
  furnitureSubcategoryIds: [134],
} as const satisfies TemperItemCategoryTree
