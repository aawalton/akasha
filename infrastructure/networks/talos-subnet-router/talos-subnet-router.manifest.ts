import type { Manifest } from "@akasha/k8s-types/manifest"

export const talosSubnetRouter = {
  id: "01a07390-b294-7b97-9afc-77a5b8ae3f76",
  pageTypeSlug: "manifest",
  slug: "talos-subnet-router",
  definition: "the deployment carrying private network traffic to the cluster nodes' addresses",
  code: "ts",
} as const satisfies Manifest
