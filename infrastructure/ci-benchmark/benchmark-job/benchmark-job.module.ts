import type { Module } from "@akasha/code-system/module"

export const benchmarkJob = {
  id: "01a0694b-36ca-7bf8-a3b6-4e9d229f788a",
  pageTypeSlug: "module",
  slug: "benchmark-job",
  definition: "the Kubernetes job that runs one benchmark on one node against one store variant",
  code: "ts",
} as const satisfies Module
