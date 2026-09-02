import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryNetWorth = {
  id: "01a060c5-3c21-7169-91d2-e88aa073a0ec",
  pageTypeSlug: "module",
  slug: "inventory-net-worth",
  definition: "what everything an account holds is worth",
  code: "ts",
} as const satisfies Module
