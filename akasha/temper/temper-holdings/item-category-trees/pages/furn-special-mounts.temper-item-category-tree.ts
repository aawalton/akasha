import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnSpecialMounts = {
  id: "01a05fcf-f80e-7127-a657-d41705fc91c1",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-special-mounts",
  title: "Special",
  parent: "furn-mounts",
  displayOrder: 17,
  furnitureSubcategoryIds: [205],
} as const satisfies TemperItemCategoryTree
