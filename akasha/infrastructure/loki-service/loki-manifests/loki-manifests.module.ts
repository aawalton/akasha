import type { Module } from "@akasha/code-system/module"

export const lokiManifests = {
  id: "01a06816-68b1-7345-a4a7-66ab2bbf829e",
  pageTypeSlug: "module",
  slug: "loki-manifests",
  definition: "the namespace, configuration, deployment and service manifests Loki runs as",
  code: "ts",
} as const satisfies Module
