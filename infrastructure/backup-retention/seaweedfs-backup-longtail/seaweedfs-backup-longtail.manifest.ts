import type { Manifest } from "@akasha/k8s-types/manifest"

export const seaweedfsBackupLongtail = {
  id: "01a0737d-3bc5-74ca-8f47-d5febbf370ba",
  pageTypeSlug: "manifest",
  slug: "seaweedfs-backup-longtail",
  definition: "the scheduled job copying the oldest backups on to slower storage",
  code: "ts",
} as const satisfies Manifest
