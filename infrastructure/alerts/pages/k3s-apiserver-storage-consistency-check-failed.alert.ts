import type { Alert } from "../alert.page-type.ts"

export const k3sApiserverStorageConsistencyCheckFailed = {
  id: "01a06755-62fa-7444-94b8-b66420795c5f",
  pageTypeSlug: "alert",
  slug: "k3s-apiserver-storage-consistency-check-failed",
  title: "K3s apiserver storage consistency check failed",
  definition: "the k3s apiserver found its storage disagreeing with itself",
  domain: "infrastructure",
  summary: "k3s apiserver detected cache/etcd inconsistency for resource={{ $labels.resource }}",
  description: "txt",
} as const satisfies Alert
