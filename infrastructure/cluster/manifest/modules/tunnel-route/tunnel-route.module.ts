import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tunnelRoute = {
  id: "01a06810-1262-7c37-b79c-3a9f3429080b",
  type: "page-type/module",
  slug: "tunnel-route",
  definition: "a public hostname and its answering in-cluster address",
  code: "ts",
} as const satisfies Module
