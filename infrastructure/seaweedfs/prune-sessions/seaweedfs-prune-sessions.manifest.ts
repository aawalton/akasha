import type { Manifest } from "@akasha/k8s-types/manifest"

export const seaweedfsPruneSessions = {
  id: "01a07387-c98a-74f1-a661-245678c39ae4",
  pageTypeSlug: "manifest",
  slug: "seaweedfs-prune-sessions",
  definition: "the namespace and the cron job removing stored agent sessions past their age",
  code: "ts",
} as const satisfies Manifest
