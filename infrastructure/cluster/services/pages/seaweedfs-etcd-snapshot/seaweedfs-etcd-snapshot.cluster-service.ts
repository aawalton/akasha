import type { ClusterService } from "../../cluster-service.page-type.types.ts"

export const seaweedfsEtcdSnapshot = {
  id: "01a06816-68b2-7704-91dc-308b6f1e9d35",
  pageTypeSlug: "cluster-service",
  type: "cluster-service",
  slug: "seaweedfs-etcd-snapshot",
  definition: "what writes a copy of the cluster's own key store",
  resourceKind: "CronJob",
  namespace: "seaweedfs",
  resourceName: "etcd-snapshot",
  image: "ghcr.io/siderolabs/talosctl:v1.12.9",
  schedule: "17 3 * * *",
  manifest: "seaweedfs-etcd-snapshot",
} as const satisfies ClusterService
