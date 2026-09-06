import type { Module } from "@akasha/code-system/module"

export const k8sManifestNodeTargeting = {
  id: "01a06735-dd9c-7004-92b4-3bb95a7cb969",
  pageTypeSlug: "module",
  slug: "k8s-manifest-node-targeting",
  definition: "the node selector, affinity and node name a manifest pins a workload with",
  code: "ts",
} as const satisfies Module
