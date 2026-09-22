import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const currencyCatalog = {
  id: "01a0604d-239d-7251-a9fa-c53450a7d1ac",
  type: "page-type/module",
  slug: "currency-catalog",
  definition: "what the game states about a currency and whether a bank has that currency",
  code: "ts",
} as const satisfies Module
