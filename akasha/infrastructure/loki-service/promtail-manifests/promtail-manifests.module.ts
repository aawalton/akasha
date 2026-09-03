import type { Module } from "@akasha/code-system/module"

export const promtailManifests = {
  id: "01a06816-68b1-702f-9567-6866b7d0ae7a",
  pageTypeSlug: "module",
  slug: "promtail-manifests",
  definition: "the configuration, permissions and daemonset manifests Promtail runs as",
  code: "ts",
} as const satisfies Module
