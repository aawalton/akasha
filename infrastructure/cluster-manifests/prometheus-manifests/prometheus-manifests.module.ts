import type { Module } from "@akasha/code-system/module"

export const prometheusManifests = {
  id: "01a06810-1263-7164-a5c1-36cfd6f66645",
  pageTypeSlug: "module",
  slug: "prometheus-manifests",
  definition: "the metrics server, its storage, its access rules and the way in to it",
  code: "ts",
} as const satisfies Module
