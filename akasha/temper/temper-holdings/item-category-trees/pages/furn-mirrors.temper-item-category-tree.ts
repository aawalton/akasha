import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnMirrors = {
  id: "01a05fcf-f802-7ebf-8098-36021adb60bc",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-mirrors",
  title: "Mirrors",
  parent: "furn-suite",
  displayOrder: 4,
  furnitureSubcategoryIds: [49],
} as const satisfies TemperItemCategoryTree
