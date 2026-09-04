import type { MonarchCategory } from "../monarch-category.page-type.ts"

export const savings = {
  id: "01a06559-5ea9-7001-9a93-456318e706b3",
  pageTypeSlug: "monarch-category",
  slug: "savings",
  title: "Savings",
  definition: "income and expenses that do not go through the budgets",
  monarchId: "148843225429187478",
  categoryGroup: "Recurring",
  categoryGroupType: "expense",
} as const satisfies MonarchCategory
