import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const cnpgCluster = {
  id: "01a073ad-4ebe-7dc9-94c9-18bf7a7281cd",
  type: "module",
  slug: "cnpg-cluster",
  definition: "the managed Postgres cluster and the instances it keeps",
  code: "ts",
} as const satisfies Module
