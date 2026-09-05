import type { Manifest } from "@akasha/k8s-types/manifest"

export const tailnetEgress = {
  id: "01a0738e-d1b0-7ee3-877d-2bfed39ea842",
  pageTypeSlug: "manifest",
  slug: "tailnet-egress",
  definition:
    "the deployment, service and policies of the proxy carrying traffic out over the private network",
  code: "ts",
} as const satisfies Manifest
