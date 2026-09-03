import type { MonarchCategory } from "../monarch-category.page-type.ts"

export const alansSpending = {
  id: "01a06559-5ea8-701a-9aff-e2af0cdc16cb",
  pageTypeSlug: "monarch-category",
  slug: "alans-spending",
  title: "Alan's Spending",
  definition: "money Alan spent from his own budget",
  monarchId: "148838877711178698",
  categoryGroup: "Personal Spending",
  categoryGroupType: "expense",
} as const satisfies MonarchCategory
