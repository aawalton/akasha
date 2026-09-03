import type { Module } from "@akasha/code-system/module"

export const tunnelRoute = {
  id: "01a06810-1262-7c37-b79c-3a9f3429080b",
  pageTypeSlug: "module",
  slug: "tunnel-route",
  definition: "one public hostname and the in-cluster address it is answered from",
  code: "ts",
} as const satisfies Module
