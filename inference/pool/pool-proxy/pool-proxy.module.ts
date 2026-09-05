import type { Module } from "@akasha/code-system/module"

export const poolProxy = {
  id: "01a06815-9efd-700a-90b6-f8c7600fbdc1",
  pageTypeSlug: "module",
  slug: "pool-proxy",
  definition: "a request passed to a service's own port and the answer passed back",
  code: "ts",
} as const satisfies Module
