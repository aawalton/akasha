import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const clusterWorkloads = {
  id: "01a068d4-d2aa-78c1-b2b4-0a455b38278d",
  type: "module",
  slug: "cluster-workloads",
  definition: "the pods one namespace holds under a label selector",
  code: "ts",
} as const satisfies Module
