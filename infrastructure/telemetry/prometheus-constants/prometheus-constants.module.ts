import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const prometheusConstants = {
  id: "01a06810-1262-7c57-9e87-4396bceef1e8",
  type: "module",
  slug: "prometheus-constants",
  definition: "the namespace, images and labels the metrics workloads carry",
  code: "ts",
} as const satisfies Module
