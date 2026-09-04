import type { MonarchCategory } from "../monarch-category.page-type.ts"

export const medical = {
  id: "01a06559-5ea8-7041-89eb-b50e5a719503",
  pageTypeSlug: "monarch-category",
  slug: "medical",
  title: "Medical",
  definition: "money spent on the family's health care",
  monarchId: "176552661307234785",
  categoryGroup: "General Spending",
  categoryGroupType: "expense",
} as const satisfies MonarchCategory
