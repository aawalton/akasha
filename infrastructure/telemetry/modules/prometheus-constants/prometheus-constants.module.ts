import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const prometheusConstants = {
  id: "01a06810-1262-7c57-9e87-4396bceef1e8",
  type: "page-type/module",
  slug: "prometheus-constants",
  definition: "the namespace and labels the metrics workloads carry",
  code: "ts",
} as const satisfies Module
