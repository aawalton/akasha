import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const poolMutex = {
  id: "01a06815-9efd-7007-bb47-59690fe21158",
  type: "page-type/module",
  slug: "pool-mutex",
  definition: "a hold no two callers have at once, taken by high asks first",
  code: "ts",
  createdAt: "2026-09-03T16:24:02.557Z",
  updatedAt: "2026-09-15T18:34:44.000Z",
} as const satisfies Module
