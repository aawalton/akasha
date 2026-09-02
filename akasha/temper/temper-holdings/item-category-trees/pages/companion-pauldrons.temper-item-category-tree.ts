import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const companionPauldrons = {
  id: "01a05fcf-f7ce-7b3d-bf0d-ec6167434a48",
  pageTypeSlug: "temper-item-category-tree",
  slug: "companion-pauldrons",
  title: "Pauldrons",
  parent: "companion-heavy",
  displayOrder: 2,
  equipTypes: [4],
} as const satisfies TemperItemCategoryTree
