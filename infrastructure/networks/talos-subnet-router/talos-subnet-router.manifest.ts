import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.types.ts"

export const talosSubnetRouter = {
  id: "01a07390-b294-7b97-9afc-77a5b8ae3f76",
  pageTypeSlug: "manifest",
  type: "manifest",
  slug: "talos-subnet-router",
  definition: "the deployment carrying private network traffic to the cluster nodes' addresses",
  code: "ts",
  generatedDirectory: true,
} as const satisfies Manifest
