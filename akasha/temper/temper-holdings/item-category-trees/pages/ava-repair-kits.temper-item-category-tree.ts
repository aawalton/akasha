import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const avaRepairKits = {
  id: "01a05fcf-f7bd-7ff3-be59-f310374cffdf",
  pageTypeSlug: "temper-item-category-tree",
  slug: "ava-repair-kits",
  title: "Repair Kits",
  parent: "alliance-war",
  displayOrder: 1,
  itemTypes: [47],
} as const satisfies TemperItemCategoryTree
