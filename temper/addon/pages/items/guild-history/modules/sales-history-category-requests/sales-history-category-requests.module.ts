import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const salesHistoryCategoryRequests = {
  id: "01a06197-4c90-7e42-8335-66339fd39d5f",
  type: "page-type/module",
  slug: "sales-history-category-requests",
  definition: "the requests a category sends the server for older events",
  code: "ts",
} as const satisfies Module
