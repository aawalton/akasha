import type { Module } from "@akasha/code-system/module"

export const sweepClusterReading = {
  id: "01a068d9-1a58-7257-8f4e-372a4606ab98",
  pageTypeSlug: "module",
  slug: "sweep-cluster-reading",
  definition: "what the containers in the CI namespace are doing, read from the cluster",
  code: "ts",
} as const satisfies Module
