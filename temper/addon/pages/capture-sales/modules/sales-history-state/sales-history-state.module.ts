import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const salesHistoryState = {
  id: "01a06197-4c9b-7ddb-b4a8-30bdf38a4ba6",
  type: "page-type/module",
  slug: "sales-history-state",
  definition: "the library object and the shared state every other part reads",
  code: "ts",
} as const satisfies Module
