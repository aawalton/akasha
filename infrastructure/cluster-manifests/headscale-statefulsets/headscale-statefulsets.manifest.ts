import type { Manifest } from "../../cluster/k8s-types/manifests/manifest.page-type.ts"

export const headscaleStatefulsets = {
  id: "01a073ae-b2af-7e9b-a63c-63ca580ff2d0",
  pageTypeSlug: "manifest",
  slug: "headscale-statefulsets",
  definition: "the coordination server's workload and the router that reaches the nodes",
  code: "ts",
} as const satisfies Manifest
