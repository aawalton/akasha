import type { Manifest } from "@akasha/k8s-types/manifest"

export const cloudflared = {
  id: "01a07387-a874-7d57-b61a-8779992b0fe9",
  pageTypeSlug: "manifest",
  slug: "cloudflared",
  definition: "the namespace and deployment holding the tunnel traffic reaches the cluster over",
  code: "ts",
} as const satisfies Manifest
