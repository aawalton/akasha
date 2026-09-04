import type { Manifest } from "@akasha/k8s-types/manifest"

export const headscaleStatefulsets = {
  id: "01a06810-1262-78eb-98e7-b79ec6710dde",
  pageTypeSlug: "manifest",
  slug: "headscale-statefulsets",
  definition: "the coordination server's workload and the router that reaches the nodes",
  code: "ts",
} as const satisfies Manifest
