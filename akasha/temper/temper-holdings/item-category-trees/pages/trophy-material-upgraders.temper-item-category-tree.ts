import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const trophyMaterialUpgraders = {
  id: "01a05fcf-f847-70fc-b569-553fb15d3ef8",
  pageTypeSlug: "temper-item-category-tree",
  slug: "trophy-material-upgraders",
  title: "Material Upgraders",
  parent: "trophies",
  displayOrder: 4,
  specializedItemTypes: [106],
} as const satisfies TemperItemCategoryTree
