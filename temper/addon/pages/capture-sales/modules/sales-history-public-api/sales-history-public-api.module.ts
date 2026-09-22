import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const salesHistoryPublicApi = {
  id: "01a06197-4c99-7088-8994-26438817c5fc",
  type: "page-type/module",
  slug: "sales-history-public-api",
  definition: "every part of the library loaded before the library starts",
  code: "ts",
} as const satisfies Module
