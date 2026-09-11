import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const poolMutex = {
  id: "01a06815-9efd-7007-bb47-59690fe21158",
  type: "module",
  slug: "pool-mutex",
  definition: "a hold no two callers have at once, taken by high asks first",
  code: "ts",
} as const satisfies Module
