import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const containerCurrencyType = {
  id: "01a05fcf-f7d2-783b-9ff4-ee42c4901641",
  pageTypeSlug: "temper-item-category-tree",
  slug: "container-currency-type",
  title: "Currency Container",
  parent: "containers",
  displayOrder: 6,
  itemTypes: [70],
} as const satisfies TemperItemCategoryTree
