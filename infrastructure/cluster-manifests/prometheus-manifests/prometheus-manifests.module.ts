import type { Module } from "@akasha/code-system/module"

export const prometheusManifests = {
  id: "01a073af-1ffc-7f13-af2b-01872be66e05",
  pageTypeSlug: "module",
  slug: "prometheus-manifests",
  definition: "the metrics server, its storage, its access rules and the way in to it",
  code: "ts",
} as const satisfies Module
