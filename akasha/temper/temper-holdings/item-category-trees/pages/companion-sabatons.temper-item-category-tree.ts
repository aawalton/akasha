import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const companionSabatons = {
  id: "01a05fcf-f7cf-732c-a359-861c739a0faf",
  pageTypeSlug: "temper-item-category-tree",
  slug: "companion-sabatons",
  title: "Sabatons",
  parent: "companion-heavy",
  displayOrder: 6,
  equipTypes: [10],
} as const satisfies TemperItemCategoryTree
