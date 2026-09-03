import type { Module } from "@akasha/code-system/module"

export const seaweedfsPruneManifests = {
  id: "01a06816-68b1-78d7-9f5d-eb0a3b7dc03a",
  pageTypeSlug: "module",
  slug: "seaweedfs-prune-manifests",
  definition: "the manifests removing stored agent sessions past their age",
  code: "ts",
} as const satisfies Module
