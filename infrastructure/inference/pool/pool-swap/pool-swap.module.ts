import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const poolSwap = {
  id: "01a06815-9efd-700b-85d8-67266e792568",
  type: "module",
  slug: "pool-swap",
  definition: "the set of resident services, changed so an asked-for one is live",
  code: "ts",
} as const satisfies Module
