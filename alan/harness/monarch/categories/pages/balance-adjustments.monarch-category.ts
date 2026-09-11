import type { MonarchCategory } from "akasha/alan/harness/monarch/categories/monarch-category.page-type.types.ts"

export const balanceAdjustments = {
  id: "01a06559-5ea8-701e-9a72-4172c7048e11",
  type: "monarch-category",
  slug: "balance-adjustments",
  title: "Balance Adjustments",
  definition: "a correction Monarch makes so an account's balance matches the bank's",
  monarchId: "148835730550823701",
  categoryGroup: "Transfers",
  categoryGroupType: "transfer",
} as const satisfies MonarchCategory
