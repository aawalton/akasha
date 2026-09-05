import type { Manifest } from "@akasha/k8s-types/manifest"

export const seaweedfsEtcdSnapshot = {
  id: "01a07381-a108-7b51-8e66-e3d14c5be3f0",
  pageTypeSlug: "manifest",
  slug: "seaweedfs-etcd-snapshot",
  definition: "the cron job writing a copy of the cluster's own key store",
  code: "ts",
} as const satisfies Manifest
