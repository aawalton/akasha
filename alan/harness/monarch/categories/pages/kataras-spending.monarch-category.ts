import type { MonarchCategory } from "akasha/alan/harness/monarch/categories/monarch-category.page-type.types.ts"

export const katarasSpending = {
  id: "01a06559-5ea8-7038-a0d0-f51479df38e1",
  type: "monarch-category",
  slug: "kataras-spending",
  title: "Katara's Spending",
  definition: "money Katara spent from her own budget",
  monarchId: "148838965539904463",
  categoryGroup: "Personal Spending",
  categoryGroupType: "expense",
} as const satisfies MonarchCategory
