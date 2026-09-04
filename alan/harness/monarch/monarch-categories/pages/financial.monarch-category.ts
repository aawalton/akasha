import type { MonarchCategory } from "../monarch-category.page-type.ts"

export const financial = {
  id: "01a06559-5ea8-7027-8efb-58092bac4d3f",
  pageTypeSlug: "monarch-category",
  slug: "financial",
  title: "Financial",
  definition: "what the family pays for financial services and insurance",
  monarchId: "148843167428254608",
  categoryGroup: "Recurring",
  categoryGroupType: "expense",
} as const satisfies MonarchCategory
