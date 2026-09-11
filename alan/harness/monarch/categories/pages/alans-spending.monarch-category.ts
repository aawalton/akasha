import type { MonarchCategory } from "akasha/alan/harness/monarch/categories/monarch-category.page-type.types.ts"

export const alansSpending = {
  id: "01a06559-5ea8-701a-9aff-e2af0cdc16cb",
  type: "monarch-category",
  slug: "alans-spending",
  title: "Alan's Spending",
  definition: "money Alan spent from his own budget",
  monarchId: "148838877711178698",
  categoryGroup: "Personal Spending",
  categoryGroupType: "expense",
} as const satisfies MonarchCategory
