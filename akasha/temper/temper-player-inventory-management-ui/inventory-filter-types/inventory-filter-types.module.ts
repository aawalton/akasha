import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryFilterTypes = {
  id: "01a0636c-5d9a-7707-9767-560092ae0015",
  pageTypeSlug: "module",
  slug: "inventory-filter-types",
  definition: "what an inventory filter and sort may hold, and what admits a value",
  code: "ts",
} as const satisfies Module
