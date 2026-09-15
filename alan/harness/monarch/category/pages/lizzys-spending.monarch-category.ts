import type { MonarchCategory } from "akasha/alan/harness/monarch/category/monarch-category.page-type.types.ts"

export const lizzysSpending = {
  id: "01a06559-5ea8-703f-864c-754f6d0be71f",
  type: "page-type/monarch-category",
  slug: "lizzys-spending",
  title: "Lizzy's Spending",
  definition: "money Lizzy spent from her own budget",
  monarchId: "148838920908315597",
  categoryGroup: "Personal Spending",
  categoryGroupType: "expense",
} as const satisfies MonarchCategory
