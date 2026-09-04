import type { MonarchCategory } from "../monarch-category.page-type.ts"

export const uncategorized = {
  id: "01a06559-5ea9-7007-b4db-ef0f757e37f6",
  pageTypeSlug: "monarch-category",
  slug: "uncategorized",
  title: "Uncategorized",
  definition: "a transaction nothing has yet said what it counts as",
  monarchId: "148835730538240775",
  categoryGroup: "General Spending",
  categoryGroupType: "expense",
} as const satisfies MonarchCategory
