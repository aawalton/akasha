import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const heavyGirdle = {
  id: "01a05fcf-f820-7ed4-96d2-02b50a30403a",
  pageTypeSlug: "temper-item-category-tree",
  slug: "heavy-girdle",
  title: "Girdle",
  parent: "heavy-armor",
  displayOrder: 4,
  equipTypes: [8],
} as const satisfies TemperItemCategoryTree
