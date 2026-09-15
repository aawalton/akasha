import type { MonarchCategory } from "akasha/alan/harness/monarch/category/monarch-category.page-type.types.ts"

export const buy = {
  id: "01a06559-5ea8-701f-8024-2af4f10d9c21",
  type: "page-type/monarch-category",
  slug: "buy",
  title: "Buy",
  definition: "money leaving cash to buy an investment",
  monarchId: "251483394309757308",
  categoryGroup: "Transfers",
  categoryGroupType: "transfer",
} as const satisfies MonarchCategory
