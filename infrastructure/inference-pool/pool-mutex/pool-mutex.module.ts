import type { Module } from "@akasha/code-system/module"

export const poolMutex = {
  id: "01a06815-9efd-7007-bb47-59690fe21158",
  pageTypeSlug: "module",
  slug: "pool-mutex",
  definition: "a hold no two callers have at once, taken by high asks first",
  code: "ts",
} as const satisfies Module
