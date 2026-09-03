import type { MonarchCategory } from "../monarch-category.page-type.ts"

export const house = {
  id: "01a06559-5ea8-7028-9ee4-d82bb7c61a28",
  pageTypeSlug: "monarch-category",
  slug: "house",
  title: "House",
  definition: "money spent on the house and what stands in it",
  monarchId: "148838860002827209",
  categoryGroup: "General Spending",
  categoryGroupType: "expense",
} as const satisfies MonarchCategory
