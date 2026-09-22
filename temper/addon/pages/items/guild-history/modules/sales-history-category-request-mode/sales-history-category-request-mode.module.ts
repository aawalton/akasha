import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const salesHistoryCategoryRequestMode = {
  id: "01a06197-4c90-740b-b859-e0c3ef202cdd",
  type: "page-type/module",
  slug: "sales-history-category-request-mode",
  definition: "whether a category asks the server for more events",
  code: "ts",
} as const satisfies Module
