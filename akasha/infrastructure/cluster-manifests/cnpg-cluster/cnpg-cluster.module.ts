import type { Module } from "@akasha/code-system/module"

export const cnpgCluster = {
  id: "01a06810-1262-718e-a2b3-5eb33330f9f5",
  pageTypeSlug: "module",
  slug: "cnpg-cluster",
  definition: "the managed Postgres cluster and the instances it keeps",
  code: "ts",
} as const satisfies Module
