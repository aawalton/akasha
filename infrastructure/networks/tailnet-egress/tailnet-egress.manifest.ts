import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.ts"

export const tailnetEgress = {
  id: "01a0738e-d1b0-7ee3-877d-2bfed39ea842",
  pageTypeSlug: "manifest",
  slug: "tailnet-egress",
  definition:
    "the deployment, service and policies of the proxy carrying traffic out over the private network",
  code: "ts",
  generatedDirectory: true,
} as const satisfies Manifest
