import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const currencyCatalog = {
  id: "01a0604d-239d-7251-a9fa-c53450a7d1ac",
  pageTypeSlug: "module",
  type: "module",
  slug: "currency-catalog",
  definition: "what the game states about one currency and whether a bank has that currency",
  code: "ts",
} as const satisfies Module
